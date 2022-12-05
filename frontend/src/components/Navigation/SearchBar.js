import { useState } from "react"

const SearchBar = () => {

    const [search, setSearch] = useState('')
    
    const magnifyingGlass = () => (
        <div style={{ color: '#767676', fontSize: "16px"}}>
           <i class="fa-solid fa-magnifying-glass"></i>
        </div>
      );
   

    return (
        <div className="searchBar">
            {magnifyingGlass()}
            <input 
                type='text'
                placeholder='Search'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
        </div>
    )
}

export default SearchBar