"use client"  
import React, { useEffect, useState, useRef } from 'react';  

interface Props {  
    time_value: number,  
    handler: () => void;  
}  

function Timer({ time_value, handler }: Props) {  
    const [time, setTime] = useState(time_value || 0);  
    const hasTriggeredRef = useRef(false);  

    useEffect(() => {  
        setTime(time_value);  

        const timerId = setInterval(() => {  
            setTime(prevCount => {  
                if (prevCount > 0) {  
                    return prevCount - 1;  
                } else {  
                    if (!hasTriggeredRef.current) {
                        hasTriggeredRef.current = true; 
                        handler(); 
                    }  
                    clearInterval(timerId);
                    return 0;  
                }  
            });  
        }, 1000);  

        return () => clearInterval(timerId); 
    }, [time_value]); 

    return (  
        <span>  
            {Math.floor(time / 60)}:{String(time % 60).padStart(2, '0')}  
        </span>  
    );  
}  

export default Timer;