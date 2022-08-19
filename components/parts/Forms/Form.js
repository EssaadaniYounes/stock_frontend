import React from 'react'

function Form(props) {
    return (
        <div className='mt-10 mx-4'>
            <div className="bg-white shadow-md p-6 rounded-md mx-auto mt-6">
                {
                    props.children

                }
            </div>
        </div>
    )
}

export default Form