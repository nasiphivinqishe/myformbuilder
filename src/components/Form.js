import React, { useEffect, useState } from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { myInputFieldToChooseFrom } from "../constants"
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



    const handleOnChangeChoosingInputToAdd = (e) => {
        var inputType = e.target.value
        var choosendInput = myInputFieldToChooseFrom.find(input => input.inputType == inputType)
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
                            return <option key={index} selected="true" value={input.inputType} disabled>{input.description}</option>
                        return <option key={index} value={input.inputType}>{input.description}</option>
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

                            if (input.inputType == 'button' || input.inputType == 'submit') {
                                return <div key={index} className="form-group">
                                    <input
                                        type={input.inputType}
                                        value={input.label}
                                        style={input.style?.reduce((agg, val) => {
                                            agg[val.name] = val.value;
                                            return agg;
                                        }, {})}
                                    />
                                </div>
                            }

                            return (
                                <div key={index} className="form-group">
                                    <label><b>{input.label}</b></label>

                                    <input
                                        type={input.inputType}
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