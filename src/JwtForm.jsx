export default function JwtForm(props) {
	return (
		<form className="jwt-form">
			<fieldset>
				<label>JWT</label>
				<textarea value={props.jwt} 
					onChange={(e) => {props.onChange(e.target.value)}} />
			</fieldset>
		</form>
	)
}
