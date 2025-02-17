export const ButtonPrimary = ({ onclick, text , Disabled = false }) => {
    return <div>
        <button type='button' disabled={Disabled} onClick={onclick} className={`${Disabled ?'bg-blue-500' :'bg-blue-600 '} text-white rounded-md  px-3 py-1`}>{text}</button>
    </div>
}
