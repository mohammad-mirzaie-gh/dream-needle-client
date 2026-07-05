import React from 'react'

function container_user_panel({ sidContent, children }: { children: React.ReactNode, sidContent?: { title?: string, section: string, spaner_content?: string } }) {
    return (
        <div className='w-full flex lg:flex-row-reverse flex-col justify-center items-start gap-5'>
            {
                sidContent ?
                    <div className=' lg:w-[330px] w-full flex flex-col justify-center items-center bg-backgroundColorTheme_1 rounded-md p-3'>
                        <h2 className='text-textColorTheme w-full p-2 font-lalezarFont font-medium text-2xl'>{sidContent.title}</h2>
                        <p className='text-textColorTheme w-full p-1 my-3 text-justify px-2 text-sm bg-[#2564eb5c] rounded-md'>{sidContent.section}</p>
                        {
                            sidContent.spaner_content ?
                                <p className='text-textColorTheme w-full p-2 bg-[#ef444491] rounded-md text-justify text-sm'>{sidContent.spaner_content}</p>
                                : null}
                    </div>
                    : null
            }
            <div className='w-full lg:p-8 md:p-5 p-4 bg-backgroundColorTheme_1 rounded-md'>
                {children}
            </div>
        </div>
    )
}

export default container_user_panel