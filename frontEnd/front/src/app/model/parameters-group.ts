export interface ParametersGroup {
    name: string,
    parameters?: Array<Parameter>,  
    pg?: Array<ParametersGroup>
}

export interface Parameter{
    // name: string,
    description: Array<string>,
    possible_values: Array<string>
    type: Array<string>,
    value: Array<string>,
    default_value: Array<string>
}
