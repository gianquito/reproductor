import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useFilePicker } from 'use-file-picker'

interface SourcePickerProps {
    setVideoSource: Dispatch<SetStateAction<any>>
}

export default function SourcePicker({ setVideoSource }: SourcePickerProps) {
    const [inputText, setInputText] = useState('')
    const [errorMsg, setErrorMsg] = useState('')
    const { openFilePicker, filesContent, loading, errors, clear } = useFilePicker({
        readAs: 'DataURL',
        accept: 'video/*',
    })

    useEffect(() => {
        if (!errors.length) return
        setErrorMsg(errors[0].name)
    }, [errors])

    function handleSubmit() {
        try {
            if (inputText !== '') {
                const regex = new RegExp(
                    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
                )
                if (!inputText.match(regex)) {
                    throw 'URL no valido'
                }
                setVideoSource(inputText)
                return
            }
            setVideoSource(filesContent[0].content)
        } catch (error) {
            setErrorMsg(error as string)
        }
    }

    return (
        <div className='w-screen h-screen flex justify-center items-center z-10'>
            <div className='bg-neutral-900 rounded flex flex-col'>
                <div className='px-8 pt-8 flex flex-col'>
                    <span className='text-white font-roboto'>Ingresa un url:</span>
                    <input
                        type='text'
                        placeholder='Video URL'
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        className='mt-2 p-2 h-6 text-xs font-roboto'
                    />
                </div>
                <div className='px-8 pb-8 mt-4'>
                    <div>
                        <span className='text-white font-roboto mt-4'>O selecciona un archivo:</span>
                        <button
                            className='bg-gray-200 font-roboto text-sm mt-2 py-0.5 px-2 ml-4 hover:bg-gray-300'
                            onClick={() => openFilePicker()}
                        >
                            Seleccionar archivo
                        </button>
                    </div>
                    <span
                        onClick={() => clear()}
                        className='text-white font-roboto underline text-sm cursor-pointer hover:line-through'
                    >
                        {filesContent[0] && filesContent[0].name}
                    </span>
                </div>
                <span className='text-red-400 font-roboto text-center text-sm'>{errorMsg}</span>
                <button
                    onClick={handleSubmit}
                    disabled={loading === true}
                    className='bg-slate-100 font-medium font-roboto mx-auto border-black border-4 rounded-lg px-6 py-0.5 mb-4 hover:bg-neutral-200'
                >
                    Aceptar
                </button>
            </div>
        </div>
    )
}
