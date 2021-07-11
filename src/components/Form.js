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
    const [selectOptions, setSelectOptions] = useState([])

    const myInputFieldToChooseFrom = [
        { key: "default", inputType: "text", value: "<input type='text' value=''/>", label: "", description: "Select input.", style: [{ name: "", value: "" }] },
        { key: "input", inputType: "text", value: "<input type='text' placeholder='Enter text here...' value=''/>", label: "", description: "Text Input", style: [{ name: "", value: "" }] },
        { key: "input", inputType: "button", value: "<input type='button' value='Button'/>", label: "", description: "Button", style: [{ name: "", value: "" }] },
        { key: "input", inputType: "file", value: "<input type='file'value=''/>", label: "", description: "File Input", style: [{ name: "", value: "" }] },
        { key: "input", inputType: "password", value: "<input type='password' placeholder='Enter password here...' value=''/>", label: "", description: "Password Input", style: [{ name: "", value: "" }] },
        { key: "input", inputType: "number", value: "<input type='number' placeholder='Enter number here...' value=''/>", label: "", description: "Number Input", style: [{ name: "", value: "" }] },
        { key: "input", inputType: "checkbox", value: "<input type='checkbox'value=''/>", label: "", description: "Checkbox Input", style: [{ name: "", value: "" }] },
        { key: "input", inputType: "color", value: "<input type='color'value=''/>", label: "", description: "Color Input", style: [{ name: "", value: "" }] },
        { key: "input", inputType: "date", value: "<input type='date'value=''/>", label: "", description: "Date Input", style: [{ name: "", value: "" }] },
        { key: "input", inputType: "datetime-local", value: "<input type='datetime-local'value=''/>", label: "", description: "Datetime-local Input", style: [{ name: "", value: "" }] },
        { key: "input", inputType: "email", value: "<input type='email'value=''/>", label: "", description: "Email Input", style: [{ name: "", value: "" }] },
        { key: "input", inputType: "hidden", value: "<input type='hidden'value=''/>", label: "", description: "Hidden Input", style: [{ name: "", value: "" }] },
        { key: "input", inputType: "month", value: "<input type='month'value=''/>", label: "", description: "Month Input", style: [{ name: "", value: "" }] },
        { key: "input", inputType: "image", value: "<input type='image'value=''/>", label: "", description: "Image Input", style: [{ name: "", value: "" }] },
        { key: "input", inputType: "radio", value: "<input type='radio'value=''/>", label: "", description: "Radio Input", style: [{ name: "", value: "" }] },
        { key: "input", inputType: "reset", value: "<input type='reset'value=''/>", label: "", description: "Reset Input", style: [{ name: "", value: "" }] },
        { key: "input", inputType: "search", value: "<input type='search'value=''/>", label: "", description: "Search Input", style: [{ name: "", value: "" }] },
        { key: "input", inputType: "submit", value: "<input type='submit'value=''/>", label: "", description: "Submit Input", style: [{ name: "", value: "" }] },
        { key: "input", inputType: "tel", value: "<input type='tel'value=''/>", label: "", description: "Tel Input", style: [{ name: "", value: "" }] },
        { key: "input", inputType: "time", value: "<input type='time'value=''/>", label: "", description: "Time Input", style: [{ name: "", value: "" }] },
        { key: "input", inputType: "url", value: "<input type='url'value=''/>", label: "", description: "Url Input", style: [{ name: "", value: "" }] },
        { key: "input", inputType: "week", value: "<input type='week'value=''/>", label: "", description: "Week Input", style: [{ name: "", value: "" }] },
        { key: "textarea", inputType: "textarea", value: "<textarea type='text' placeholder='Enter text here...' value=''/></textarea>", label: "", description: "Text Area", style: [{ name: "", value: "" }] },
        { key: "select", inputType: "select", value: "<select></select>", label: "", description: "Select", style: [{ name: "", value: "" }] }
    ]

    const handleOnChangeChoosingInputToAdd = (e) => {
        var key = e.target.value
        var choosendInput = myInputFieldToChooseFrom.find(input => input.key == key)
        updateCurrentInputCustomizing(choosendInput)
    }

    const handledAddingInputToForm = () => {
        var tempInputList = [...myInputList]
        currentInputCustomizing.style = [...style]

        if (currentInputCustomizing.key == 'select')
            currentInputCustomizing.option = [...selectOptions]

        tempInputList.push(currentInputCustomizing)
        updateMyInputsList(tempInputList)
        let defaultCustomizingInput = { style: [{ name: "", value: "" }] }
        updateCurrentInputCustomizing(defaultCustomizingInput)
        setStyle([])
        setSelectOptions([])
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

    const updateSelectOptionsOfCustomizingInput = (key, index, value) => {
        //temp style holder 
        var tempStateCurrentInputCustomizing = currentInputCustomizing
        var currentSelectOptions = [...selectOptions]

        //updating temp variable
        if (key === 'name') {
            currentSelectOptions[index].description = value
        } else if (key === 'value') {
            currentSelectOptions[index].value = value
        }

        tempStateCurrentInputCustomizing.selectOptions = selectOptions
        updateCurrentInputCustomizing(tempStateCurrentInputCustomizing)
    }

    const addMoreStylePropertyInput = () => {
        var tempState = [...style]
        tempState.push({ name: "", value: "" })
        setStyle(tempState)
    }

    const addMoreSelectOptions = () => {
        var tempState = [...selectOptions]
        tempState.push({ description: "", value: "" })
        setSelectOptions(tempState)
    }

    const removesStyleProperty = (index) => {
        var tempStyle = [...style]
        tempStyle.splice(index, 1)
        setStyle(tempStyle)
    }

    const removesSelectOptionProperty = (index) => {
        var tempSelectOptions = [...selectOptions]
        tempSelectOptions.splice(index, 1)
        setSelectOptions(tempSelectOptions)
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
                    <h4><b>Style: </b></h4>
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
                            <i className="fa fa-plus" aria-hidden="true" onClick={() => addMoreStylePropertyInput()}>Add style</i>
                        </div>
                    </div>

                    <div style={{ display: currentInputCustomizing.key == 'select' ? "inline" : "none" }}>
                        <h4><b>Options:</b></h4>
                        {selectOptions.map((option, index) => {
                            return (
                                <div className="form-inline" key={index}>
                                    <div className={`form-group ${styleClasses.formGroup}`}>
                                        <label>Description </label>
                                        <input type='text' className='form-control' onChange={(e) => updateSelectOptionsOfCustomizingInput('name', index, e.target.value)} />

                                        <label>Value </label>
                                        <input type='text' className='form-control' onChange={(e) => updateSelectOptionsOfCustomizingInput('value', index, e.target.value)} />
                                    </div>
                                    <i className="fa fa-minus" title="Remove this option." style={{ fontWeight: "bolder" }} onClick={() => removesSelectOptionProperty(index)}></i>
                                </div>)
                        })
                        }
                        <div className="row" title="Add more select prop.">
                            <div className="col-sm-12">
                                <i className="fa fa-plus" aria-hidden="true" onClick={() => addMoreSelectOptions()}> Add option</i>
                            </div>
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
            </div >


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
                        } else if (input.key == "select") {
                            return <div key={index} className="form-group">
                                <label><b>{input.label}</b></label>

                                <select style={input.style?.reduce((agg, val) => {
                                    agg[val.name] = val.value;
                                    return agg;
                                }, {})}
                                >
                                    {input.selectOptions.map((option, index) =>
                                    (
                                        <option key={index} value={option.value}>{option.description}</option>
                                    ))}
                                </select>
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