export  const handleSearch = (datainput,items)=>{
    console.log(datainput)
    console.log(items)
            const data = items.filter((item)=>{
                return item.name.toLowerCase().includes(datainput.toLowerCase()) 
            })
            return data
        }