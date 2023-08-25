export interface ParametersGroup {
    // parent?: ParametersGroup,
    name: string,
    Parameter?: Array<Parameter>,
    ParametersGroup?: Array<ParametersGroup>
}

export interface Parameter{
    // parent?: ParametersGroup,
    name: string,
    description: string,
    possible_values: string,
    type: string,
    value: string,
    default_value: string
}

// export function getFullPathParam(param: ParametersGroup | Parameter | undefined): Array<string> {
// 	if(param === undefined) {
// 		return [];
// 	}
// 	return [...getFullPathParam(param.parent), ...param.name];
// }