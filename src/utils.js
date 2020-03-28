

// takes the super long string and truncates parts of it to make it shorter and more readable

function truncate_address(address) {

    const first_part = address.slice(0, 22)
    //const last_part = address.slice(address.length - 5, address.length)

    return first_part + " . . . " 

}





export { truncate_address };
