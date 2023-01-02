import React from 'react'
import classes from './CircleLoader.module.css'
function CircleLoader() {
    return (
        // <div className="w-24 h-24 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2  z-10">
        //     <div className="w-full h-full rounded-full perspective-8">
        //         <div className="absolute w-full h-full rounded-full border-b-[6px] border-[#f13a8f] transform rotate-x-[35deg] rotate-y-[-45deg] animate-[rotate-one_1s_linear_infinite]"></div>
        //         <div className="absolute w-full h-full rounded-full border-r-[6px] border-[#4bc8eb] transform rotate-x-[50deg] rotate-y-[10deg] animate-[rotate-two_1s_linear_infinite]"></div>
        //         <div className="absolute w-full h-full rounded-full border-t-[6px] border-[#36f372] transform rotate-x-[35deg] rotate-y-[55deg] animate-[rotate-three_1s_linear_infinite]"></div>
        //     </div>
        // </div>
        <div className={`${classes.loader} absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2  z-10`}>
            <div className={classes.loaderItem}></div>
            <div className={classes.loaderItem}></div>
            <div className={classes.loaderItem}></div>
        </div>

    )
}

export default CircleLoader