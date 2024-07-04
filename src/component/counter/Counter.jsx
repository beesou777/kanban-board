import React from 'react'
import { increment, decrement } from '../../store/storesSlice/counter'
import { useDispatch, useSelector } from 'react-redux'

const Counter = () => {
    const dispatch = useDispatch()
    const count = useSelector(state => state.counter.value)
    const increaseCount = ()=>{
        dispatch(increment())
    }

    const decreaseCount = ()=>{
        return count > 0 ? dispatch(decrement()) : '';
    }
    return (
        <>
            <div>
                <h1 className="text-3xl pb-6">Counter store</h1>
               <div className="flex gap-2 items-center">
               <button className="border p-3 text-[32px]" onClick={increaseCount}>+</button>
                <h1 className="text-[48px]">{count}</h1>
                <button className="border p-3 text-[32px]" onClick={decreaseCount}>-</button>
               </div>
            </div>
        </>
    )
}

export default Counter