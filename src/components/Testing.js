import { useState } from "react";

const Testing = () =>{
    const [count , setCount] = useState(0);
    // const increment = () =>{
    //     setCount(count+1);
    //     setCount(count+2);
    //     setCount(count+3);
    // }
    const increment = () => {
        setCount(prevCount => prevCount + 1);
        setCount(prevCount => prevCount + 2);
        setCount(prevCount => prevCount + 3);
    }
    /*The reason only setCount(count+3) is executing is due to the way React batches state updates.
     When you call setCount, it doesn’t immediately update the count value.
      Instead, it schedules an update to happen in the future.

In your increment function, when you call setCount(count+1), setCount(count+2),
 and setCount(count+3), all these updates are batched together and executed at once. 
 However, since count doesn’t immediately change after each setCount call,
  all three setCount calls see the same value of count, which is why you’re seeing
   the result of setCount(count+3). 
   In second version of increment, each setCount call receives the most recent count value (prevCount),
    ensuring that each increment is based on the updated count.
     This way, the count will increase by 1, then 2, then 3, as  intended.

*/    
    return(
        <>
            <button onClick={increment}>Click</button>
            <h4>{count}</h4>
        </>
    )
}
export default Testing;