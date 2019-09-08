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

export const times = x => f => {
    if (x > 0) {
      f()
      times (x - 1) (f)
    }
}