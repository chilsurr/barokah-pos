import { Input } from "antd";

function SearchBox  ({value,onChange}){
    // console.log(value)
    // console.log(items)
    // const data = items.filter((item)=>{
    //     return item.name.toLowerCase().includes(value.toLowerCase()) 
    // })
    // console.log(data)
    // return data
    return(
        <Input 
            placeholder='search product' 
            onChange={onChange} 
            value={value}
        />
    )
}

export default SearchBox