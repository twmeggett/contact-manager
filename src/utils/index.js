export const updateFormValue = (name, context) => {
    return (event) => {
        context.setState({
            formVals: {
                ...context.state.formVals,
                [name]: event.target.value,
            },
        })
    };
}