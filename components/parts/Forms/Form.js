import React from 'react'

function Form(props) {
    return (
        <div className={`mt-4 mx-2`}>
            <div className="bg-white shadow-md rounded-md mx-auto mt-6">
                {
                    props.children

                }
            </div>
        </div>
    )
}

export default Form