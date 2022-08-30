import React from 'react'

function Form(props) {
    return (
        <div className={`mt-10 mx-4`}>
            <div className="bg-white shadow-md rounded-md mx-auto mt-6 p-4">
                {
                    props.children

                }
            </div>
        </div>
    )
}

export default Form