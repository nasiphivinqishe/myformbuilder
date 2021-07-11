import React, { useEffect, useState } from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) =>
    createStyles({
        formGroup: {
            marginTop: "1% !important"
        },
    })
);

const Form = () => {
    const styleClasses = new useStyles()

    const [myInputList, updateMyInputsList] = useState([])
    const [currentInputCustomizing, updateCurrentInputCustomizing] = useState({ style: [{ name: "", value: "" }] })
    const [style, setStyle] = useState([])

    const [myInputFieldToChooseFrom, updateInputFieldToChooseFrom] = useState([
        { key: "default", inputType: "text", value: "<input type='text' value=''/>", label: "Default Label", description: "Select input.", style: [{ name: "", value: "" }] },

        { key: "input", inputType: "text", value: "<input type='text' placeholder='Enter text here...' value=''/>", label: "Default Label", description: "Text Input", style: [{ name: "", value: "" }] },
        { key: "input", inputType: "button", value: "<input type='button' value='Button'/>", label: "Default Label", description: "Button", style: [{ name: "", value: "" }] },
        { key: "input", inputType: "file", value: "<input type='file'value=''/>", label: "Default Label", description: "File Input", style: [{ name: "", value: "" }] },
        { key: "input", inputType: "password", value: "<input type='password' placeholder='Enter password here...' value=''/>", label: "Default Label", description: "Password Input", style: [{ name: "", value: "" }] },
        { key: "input", inputType: "number", value: "<input type='number' placeholder='Enter number here...' value=''/>", label: "Default Label", description: "Number Input", style: [{ name: "", value: "" }] },

        ///////////////////////////////////////


        ///////////////////////////////////////


        { key: "textarea", inputType: "textarea", value: "<textarea type='text' placeholder='Enter text here...' value=''/></textarea >", label: "Default Label", description: "Text Area", style: [{ name: "", value: "" }] }
    ])

    const handleOnChangeChoosingInputToAdd = (e) => {
        var key = e.target.value
        var choosendInput = myInputFieldToChooseFrom.find(input => input.key == key)
        updateCurrentInputCustomizing(choosendInput)
    }

    const handledAddingInputToForm = () => {
        var tempInputList = [...myInputList]
        currentInputCustomizing.style = [...style]
        tempInputList.push(currentInputCustomizing)
        updateMyInputsList(tempInputList)
        // updateCurrentInputCustomizing({ style: [] })
        let defaultCustomizingInput = { style: [{ name: "", value: "" }] }
        updateCurrentInputCustomizing(defaultCustomizingInput)
        setStyle([])
    }

    const updatePropertiesOfCurrentInputCustoming = (e) => {
        var temp = { ...currentInputCustomizing }
        temp.label = e.target.value
        updateCurrentInputCustomizing(temp)
    }

    const checkIfObjectIsEmpty = (obj) => {
        return obj && Object.keys(obj).length === 0 && obj.constructor === Object
    }

    const updateStyleOfCustomizingInput = (key, index, value) => {

        //temp style holder 
        var tempStateCurrentInputCustomizing = currentInputCustomizing
        var currentStyle = [...style]

        //updating temp variable
        if (key === 'name') {
            currentStyle[index].name = value
        } else if (key === 'value') {
            currentStyle[index].value = value
        }

        tempStateCurrentInputCustomizing.style = currentStyle
        updateCurrentInputCustomizing(tempStateCurrentInputCustomizing)
    }

    const addMoreStylePropertyInput = () => {
        var tempState = [...style]
        tempState.push({ name: "", value: "" })
        setStyle(tempState)
    }

    const removesStyleProperty = (index) => {
        var tempStyle = [...style]
        tempStyle.splice(index, 1)
        setStyle(tempStyle)
    }

    const downloadBuiltForm = () => {
        var form = document.getElementById("outputForm")

        if (form) {
            createAndDownloadTextFile(form.innerHTML)
        }
    }

    const createAndDownloadTextFile = (value) => {
        const element = document.createElement("a");
        const file = new Blob([value], { type: 'text/plain' });

        element.href = URL.createObjectURL(file);
        element.download = "my_form.txt";
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
    }


    return (
        <div>

            <div className="form-group">
                <label>Select Input</label>
                <select className="form-control" onChange={(e) => handleOnChangeChoosingInputToAdd(e)}>

                    {myInputFieldToChooseFrom.map((input, index) => {
                        if (index == 0)
                            return <option key={index} selected="true" value={input.key} disabled>{input.description}</option>
                        return <option key={index} value={input.key}>{input.description}</option>
                    })}

                </select>
            </div>

            <div style={{ display: !currentInputCustomizing.value ? "none" : "inline" }}>
                <div className="w3-row w3-card-4 containerInputCustomizing" style={{ padding: "3%" }}>
                    <h3><b>Cuctomize Input Properties</b></h3>
                    <p>Type: <b>{currentInputCustomizing.description}</b> </p>
                    <h4>Style: </h4>
                    {style.map((styleProperties, index) => {
                        return (
                            <div className="form-inline" key={index}>
                                <div className={`form-group ${styleClasses.formGroup}`}>
                                    <label>Name </label>
                                    <input type='text' className='form-control' onChange={(e) => updateStyleOfCustomizingInput('name', index, e.target.value)} />

                                    <label>Value </label>
                                    <input type='text' className='form-control' onChange={(e) => updateStyleOfCustomizingInput('value', index, e.target.value)} />
                                </div>
                                <i className="fa fa-minus" title="Remove this style prop." style={{ fontWeight: "bolder" }} onClick={() => removesStyleProperty(index)}></i>
                            </div>)
                    })
                    }

                    <div className="row" title="Add more style prop.">
                        <div className="col-sm-12">
                            <i className="fa fa-plus" aria-hidden="true" onClick={() => addMoreStylePropertyInput()}></i>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Label:</label>
                        <input
                            type='text'
                            className="form-control"
                            onChange={(e) => updatePropertiesOfCurrentInputCustoming(e)}
                            placeholder="Enter your input label." />
                    </div>

                    <div className="form-group">
                        <button title="Add to form" className="btn btn-md btn-success" onClick={handledAddingInputToForm}>
                            Save <i className="fa fa-save" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>
            </div>


            <div style={{ display: myInputList.length == 0 ? "none" : "inline" }}>
                <hr />
                <h3><b>Output Form</b></h3> <br />
                <div id="outputForm">
                    {myInputList.map((input, index) => {

                        if (input.key == "input") {

                            return (
                                <div key={index} className="form-group">
                                    <label><b>{input.label}</b></label>


                                    <input type="text"
                                        style={input.style?.reduce((agg, val) => {
                                            agg[val.name] = val.value;
                                            return agg;
                                        }, {})}
                                    />
                                </div>
                            )
                        } else if (input.key == "textarea") {
                            return <div key={index} className="form-group">
                                <label><b>{input.label}</b></label>

                                <textarea style={input.style?.reduce((agg, val) => {
                                    agg[val.name] = val.value;
                                    return agg;
                                }, {})}
                                ></textarea>
                            </div>
                        }
                    })}
                </div>

                <div className="btn btn-md btn-success" onClick={() => downloadBuiltForm()}>
                    <i className="fa fa-download"> <b>Download</b></i>
                </div>
            </div>

        </div >
    )
}
export default Form;