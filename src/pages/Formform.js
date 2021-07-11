import React, { useState } from "react";

const Formform = () => {

    const [myStyle, setStyle] = useState({ color: "red", border: '2px solid pink' })
    const [myInputList, updateMyInputsList] = useState([])
    const [currentInputCustomizing, updateCurrentInputCustomizing] = useState({})

    const [myInputFieldToChooseFrom, updateInputFieldToChooseFrom] = useState([
        { key: "input_text", value: "<input type='text' class='form-control' value=''/>", label: "Default Label", description: "Text Input" },
        { key: "input_button", value: "<input type='button' class='btn btn-md' value='My Button'/>", label: "Default Label", description: "Button" },
        { key: "input_file", value: "<input type='file' class='form-control' value=''/>", label: "Default Label", description: "File Input" },
        { key: "input_password", value: "<input type='password'class='form-control' value=''/>", label: "Default Label", description: "Password Input" },
        { key: "input_number", value: "<input type='number' class='form-control' value=''/>", label: "Default Label", description: "Number Input" },
        { key: "text_field", value: "<textarea type='text' class='form-control' value=''/></textarea >", label: "Default Label", description: "Text Area" }
    ])

    const handleOnChangeChoosingInputToAdd = (e) => {
        var key = e.target.value
        var choosendInput = myInputFieldToChooseFrom.find(input => input.key == key)
        updateCurrentInputCustomizing(choosendInput)
    }

    const handledAddingInputToForm = () => {
        var tempInputList = [...myInputList]
        tempInputList.push(currentInputCustomizing)
        updateMyInputsList(tempInputList)
    }

    const updatePropertiesOfCurrentInputCustoming = (e) => {
        // console.log(e.target.value)

        // console.log(currentInputCustomizing)
        // var temp = currentInputCustomizing
        // temp.label = e.target.value

        // updateCurrentInputCustomizing(temp)
    }

    return (

        <div className="container text-center">
            <br></br>
            <div className="row">
                <div className="col-md-7">
                    <p>My Form Builder</p>
                    <p>
                        Select Input
                        <select onChange={(e) => handleOnChangeChoosingInputToAdd(e)}>

                            {myInputFieldToChooseFrom.map((input, index) => {
                                return <option key={index} value={input.key}>{input.description}</option>
                            })}

                        </select>
                    </p>
                    <hr></hr>

                    <div>
                        Editing place for input <br></br>
                        Type of input is: <b>{currentInputCustomizing.description}</b>  <br></br>
                        Style:
                        <br></br>
                        Enter label here: <input type='text' onChange={(e) => updatePropertiesOfCurrentInputCustoming(e)} value={currentInputCustomizing.label} />

                        <button onClick={handledAddingInputToForm}>Add to form</button>
                    </div>
                    <hr></hr>
                    {myInputList.map((input, index) => {
                        return (
                            <div key={index}>
                                <label><b>{input.label}</b></label>

                                <div
                                    style={myStyle}
                                    dangerouslySetInnerHTML={{ __html: `${input.value}` }}>
                                </div>
                                <br></br>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>

    )
}
export default Formform;