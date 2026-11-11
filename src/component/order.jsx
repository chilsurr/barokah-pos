import { useState, useEffect } from "react";
import { Collapse, Button, Input, Modal, message, Empty } from "antd";
import {
    CheckOutlined,
    CheckCircleOutlined,
    SearchOutlined,
    PrinterOutlined,
    ClockCircleOutlined,
    ShoppingOutlined,
    UserOutlined
} from "@ant-design/icons";
import dayjs from "dayjs";

import "../style/order.css";
import down from "../assets/down.png";
import up from "../assets/up.png";
import invoiceIcon from "../assets/invoice.png";

import { getOnlineOrders, patchOrder, getCurrentUser } from "../utils/api";
import { convertIdr } from "../utils/curency";

function Order() {
    const [tabActive, setTabActive] = useState("On Process");
    const [searchQuery, setSearchQuery] = useState("");
    const [allOrders, setAllOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    // Ambil data real dari database menggunakan API
    const fetchOnlineOrders = async () => {
        setLoading(true);
        try {
            const response = await getOnlineOrders();
            const data = response?.data || [];

            const formatted = data.map((order) => {
                const dateObj = dayjs(order.created_at);
                const tanggal = dateObj.isValid() ? dateObj.format("YYYY-MM-DD") : (order.created_at || "-");
                const jam = dateObj.isValid() ? dateObj.format("HH:mm:ss") : "00:00:00";

                const mappedItems = Array.isArray(order.items) && order.items.length > 0
                    ? order.items.map((it) => ({
                        id: it.id || it.product?.id,
                        nama: it.product?.name || `Produk #${it.id}`,
                        price: it.product?.price || (it.price && it.quantity ? it.price / it.quantity : it.price) || 0,
                        category: it.product?.category || "Umum",
                        img: it.product?.image || null,
                        quantity: it.quantity || 1,
                    }))
                    : [];

                const total = order.total || mappedItems.reduce((acc, it) => acc + it.price * it.quantity, 0);

                return {
                    id: order.id,
                    customer: order.customer_id || order.customer,
                    customer_name: order.customer_name || (order.customer ? `Customer #${order.customer}` : null),
                    invoice: order.invoice,
                    status: order.status || "On Process",
                    tanggal: tanggal,
                    jam: jam,
                    total: total,
                    items: mappedItems,
                };
            });

            setAllOrders(formatted);
            localStorage.setItem("online_orders", JSON.stringify(formatted));
        } catch (error) {
            console.error("Gagal mengambil data pesanan online dari database:", error);
            const saved = localStorage.getItem("online_orders");
            if (saved) {
                try {
                    setAllOrders(JSON.parse(saved));
                } catch (e) {
                    console.error("Gagal parse cache online_orders:", e);
                }
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOnlineOrders();

        // Listen for updates from other tabs/windows
        const handleStorageChange = (e) => {
            if (e.key === "online_orders" && e.newValue) {
                try {
                    setAllOrders(JSON.parse(e.newValue));
                } catch (err) {
                    console.error(err);
                }
            }
        };

        const handleCustomEvent = () => {
            fetchOnlineOrders();
        };

        window.addEventListener("storage", handleStorageChange);
        window.addEventListener("online_orders_updated", handleCustomEvent);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
            window.removeEventListener("online_orders_updated", handleCustomEvent);
        };
    }, []);

    // Helper to save orders and broadcast
    const updateOrdersLocal = (newOrders) => {
        setAllOrders(newOrders);
        localStorage.setItem("online_orders", JSON.stringify(newOrders));
        window.dispatchEvent(new Event("online_orders_updated"));
    };

    // 1. Kasir konfirmasi pesanan siap diambil (On Process -> Need Pick-up)
    const handleConfirmReady = (order) => {
        Modal.confirm({
            title: "Konfirmasi Pesanan Siap Diambil",
            icon: <ShoppingOutlined style={{ color: "#2E7D32" }} />,
            content: (
                <div>
                    <p>Apakah pesanan dengan nomor bon <b>{order.invoice}</b> sudah selesai disiapkan oleh kasir?
                        Status pesanan akan berubah menjadi <b>Perlu Diambil</b> dan customer akan diberi notifikasi bahwa pesanan siap diambil di gerai.
                    </p>
                </div>
            ),
            okText: "Ya, Pesanan Siap",
            cancelText: "Batal",
            okButtonProps: {
                style: { backgroundColor: "#2E7D32", borderColor: "#2E7D32" }
            },
            onOk: async () => {
                let cashierId = localStorage.getItem("user_id");
                if (!cashierId) {
                    const userObj = await getCurrentUser();
                    if (userObj?.id) {
                        cashierId = userObj.id;
                    }
                }

                try {
                    await patchOrder(order.id, {
                        status: "Need Pick-up",
                        user_id: cashierId ? Number(cashierId) : null,
                        cashier: cashierId ? Number(cashierId) : null,
                    });
                } catch (err) {
                    console.warn("Gagal update status via API:", err);
                }

                const updated = allOrders.map((item) =>
                    item.id === order.id ? { ...item, status: "Need Pick-up" } : item
                );
                updateOrdersLocal(updated);
                message.success(`Pesanan ${order.invoice} siap diambil oleh customer!`);
            },
        });
    };

    // 2. Kasir konfirmasi pesanan sudah diambil customer (Need Pick-up -> Done)
    const handleConfirmPickedUp = (order) => {
        Modal.confirm({
            title: "Konfirmasi Pesanan Sudah Diambil",
            icon: <CheckCircleOutlined style={{ color: "#1976d2" }} />,
            content: (
                <div>
                    <p>Customer telah datang ke gerai dan mengambil pesanan <b>{order.invoice}</b>?
                        Status pesanan akan diselesaikan (<b>Done</b>) dan transaksi dinyatakan selesai.
                    </p>
                </div>
            ),
            okText: "Ya, Selesaikan Pesanan",
            cancelText: "Batal",
            okButtonProps: {
                style: { backgroundColor: "#1976d2", borderColor: "#1976d2" }
            },
            onOk: async () => {
                let cashierId = localStorage.getItem("user_id");
                if (!cashierId) {
                    const userObj = await getCurrentUser();
                    if (userObj?.id) {
                        cashierId = userObj.id;
                    }
                }

                try {
                    await patchOrder(order.id, {
                        status: "Done",
                        user_id: cashierId ? Number(cashierId) : null,
                        cashier: cashierId ? Number(cashierId) : null,
                    });
                } catch (err) {
                    console.warn("Gagal update status via API:", err);
                }

                const updated = allOrders.map((item) =>
                    item.id === order.id ? { ...item, status: "Done" } : item
                );
                updateOrdersLocal(updated);
                message.success(`Pesanan ${order.invoice} telah diserahkan dan selesai!`);
            },
        });
    };

    // Cetak struk dummy
    const handlePrintReceipt = (order) => {
        message.info(`Mencetak struk untuk invoice ${order.invoice}...`);
        window.print();
    };

    // Calculate count per status
    const countOnProcess = allOrders.filter((o) => o.status === "On Process").length;
    const countNeedPickup = allOrders.filter((o) => o.status === "Need Pick-up").length;
    const countDone = allOrders.filter((o) => o.status === "Done").length;

    // Filter orders by active tab and search query
    const filteredOrders = allOrders.filter((order) => {
        const matchesTab = order.status === tabActive;
        const matchesSearch =
            searchQuery.trim() === "" ||
            order.invoice.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (order.customer_name && order.customer_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
            order.items.some((it) => it.nama.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesTab && matchesSearch;
    });

    const tabs = [
        { value: "On Process", label: "Sedang Disiapkan", count: countOnProcess },
        { value: "Need Pick-up", label: "Perlu Diambil", count: countNeedPickup },
        { value: "Done", label: "Selesai", count: countDone },
    ];

    // Status badge helper
    const renderStatusBadge = (status) => {
        switch (status) {
            case "On Process":
                return <span className="pos-status-badge pos-status-on-process"><ClockCircleOutlined /> On Process</span>;
            case "Need Pick-up":
                return <span className="pos-status-badge pos-status-need-pickup"><ShoppingOutlined /> Need Pick-up</span>;
            case "Done":
                return <span className="pos-status-badge pos-status-done"><CheckCircleOutlined /> Done</span>;
            default:
                return <span className="pos-status-badge">{status}</span>;
        }
    };

    // Build collapse items
    const collapseItems = filteredOrders.map((order) => {
        const totalItemsQty = order.items.reduce((acc, it) => acc + (it.quantity || 1), 0);
        const orderTotal = order.total || order.items.reduce((acc, it) => acc + (it.price || 0) * (it.quantity || 1), 0);

        return {
            key: order.id,
            label: (
                <div className="pos-order-header">
                    <div className="pos-order-header-left">
                        <div className="pos-icon-box">
                            <img src={invoiceIcon} alt="invoice" />
                        </div>
                        <div className="pos-order-info">
                            <div className="pos-order-header-top">
                                <span className="pos-order-invoice">{order.invoice}</span>
                                {order.customer_name && (
                                    <span className="pos-order-customer-badge">
                                        {order.customer_name}
                                    </span>
                                )}
                            </div>
                            <div className="pos-order-date">
                                {order.tanggal} • {order.jam}
                                {renderStatusBadge(order.status)}
                            </div>
                        </div>
                    </div>
                    <div className="pos-order-header-right">
                        <div className="pos-order-summary-chip">
                            <div className="pos-order-item-count">{totalItemsQty} Barang</div>
                            <div className="pos-order-total-price">{convertIdr(orderTotal)}</div>
                        </div>
                    </div>
                </div>
            ),
            children: (
                <div className="pos-order-body">
                    {/* Customer Info Bar */}
                    <div className="pos-customer-info-bar">
                        <span className="pos-customer-info-label">Customer / Pemesan:</span>
                        <span className="pos-customer-info-name">
                            <UserOutlined style={{ marginRight: 6, color: "var(--primary-color, #2E7D32)" }} />
                            <b>{order.customer_name || "Pelanggan Online (Umum)"}</b>
                        </span>
                    </div>

                    {/* Items table */}
                    <div className="pos-items-table">
                        <div className="pos-items-table-header">
                            <div>Nama Produk</div>
                            <div>Harga</div>
                            <div>Jumlah</div>
                            <div>Subtotal</div>
                        </div>
                        {order.items.map((item, idx) => (
                            <div key={item.id || idx} className="pos-item-row">
                                <div className="pos-item-product">
                                    {item.img && <img src={item.img} alt={item.nama} className="pos-item-img" />}
                                    <span>{item.nama}</span>
                                </div>
                                <div className="pos-item-price">{convertIdr(item.price || 0)}</div>
                                <div className="pos-item-qty">{item.quantity}x</div>
                                <div className="pos-item-subtotal">{convertIdr((item.price || 0) * item.quantity)}</div>
                            </div>
                        ))}
                    </div>

                    {/* Total Bar */}
                    <div className="pos-order-total-bar">
                        <span>Total Pembayaran Online:</span>
                        <span className="pos-total-amount">{convertIdr(orderTotal)}</span>
                    </div>

                    {/* Cashier Action Box */}
                    <div className="pos-cashier-action-box">
                        {order.status === "On Process" && (
                            <>
                                <div className="pos-action-guide">
                                    <span>
                                        Periksa seluruh item di atas, lalu klik tombol konfirmasi jika sudah selesai dikemas.
                                    </span>
                                </div>
                                <div className="pos-action-buttons">
                                    <Button
                                        type="primary"
                                        className="btn-confirm-ready"
                                        onClick={() => handleConfirmReady(order)}
                                    >
                                        Konfirmasi Pesanan Siap
                                    </Button>
                                </div>
                            </>
                        )}

                        {order.status === "Need Pick-up" && (
                            <>
                                <div className="pos-action-guide">
                                    <span>
                                        Pesanan siap di gerai. Cocokkan nomor invoice saat customer datang mengambil, lalu konfirmasi pesanan telah diambil.
                                    </span>
                                </div>
                                <div className="pos-action-buttons">
                                    <Button
                                        type="primary"
                                        className="btn-confirm-pickup"
                                        onClick={() => handleConfirmPickedUp(order)}
                                    >
                                        Konfirmasi Sudah Diambil
                                    </Button>
                                </div>
                            </>
                        )}

                        {order.status === "Done" && (
                            <>
                                <div className="pos-action-guide">
                                    <span>Pesanan telah selesai diserahkan kepada customer. Transaksi tuntas.</span>
                                </div>
                                <div className="pos-action-buttons">
                                    <Button
                                        icon={<PrinterOutlined />}
                                        onClick={() => handlePrintReceipt(order)}
                                    >
                                        Cetak Struk
                                    </Button>
                                    <Button disabled className="btn-done-status">
                                        Selesai
                                    </Button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            ),
        };
    });

    return (
        <div className="pos-order-page">
            <div className="pos-order-container">
                {/* Topbar: Title & Search */}
                <div className="pos-order-topbar">
                    <div className="pos-order-title-box">
                        <h2>
                            <ShoppingOutlined /> PESANAN ONLINE
                        </h2>
                        <p>Kelola dan konfirmasi alur pesanan online masuk dari pelanggan</p>
                    </div>

                    <div className="pos-order-actions">
                        <Input
                            placeholder="Cari No Bon / Nama Produk..."
                            prefix={<SearchOutlined />}
                            className="pos-search-input"
                            allowClear
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {/* Status Tabs */}
                <div className="order-tabs">
                    {tabs.map((tab) => (
                        <div
                            key={tab.value}
                            className={`order-tab ${tabActive === tab.value ? "active" : ""}`}
                            onClick={() => setTabActive(tab.value)}
                        >
                            <span>{tab.label}</span>
                            <span className="tab-badge">{tab.count}</span>
                        </div>
                    ))}
                </div>

                {/* Order List / Empty State */}
                {filteredOrders.length === 0 ? (
                    <div className="pos-empty-container">
                        <Empty
                            description={
                                searchQuery
                                    ? `Tidak ditemukan pesanan yang cocok dengan "${searchQuery}"`
                                    : `Belum ada pesanan dengan status ${tabActive}`
                            }
                        />
                    </div>
                ) : (
                    <Collapse
                        items={collapseItems}
                        accordion
                        ghost
                        className="pos-order-collapse"
                        expandIconPlacement="end"
                        expandIcon={({ isActive }) => (
                            <img
                                src={isActive ? up : down}
                                alt="toggle"
                                style={{
                                    width: "22px",
                                    height: "22px",
                                    objectFit: "contain",
                                }}
                            />
                        )}
                    />
                )}
            </div>
        </div>
    );
}

export default Order;
