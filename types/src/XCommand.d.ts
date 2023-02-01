export type XCommandData = {
    id: string;
    _module?: string | null;
    _object?: string | null;
    _op?: string;
    _date_created?: number;
    _params?: {
        [k: string]: string | number | Function;
    };
};
/**
 * @class XCommand
 */
export declare class XCommand {
    private id;
    _module?: string | null;
    _object?: string | null;
    _op?: string;
    _params: {
        [k: string]: string | number | Function;
    };
    _date_created: number;
    constructor();
    /**
     * Gets th parameter value from the XCommand whether it has a name or just a position
     * There are 2 ways to send XCommand with parameters:
     *  1. <module> <op> <param-0> <param-1> <param-2>     // position is for this case
     *  2. <module> <op> param-name:param-value            // name is for this case
     * @param position the position of the parameter if no name is send
     * @param name the name of the parameter
     * @param defaultValue the default value if none above exists
     * @returns {any} the actual parameter value
     */
    getParam(position: number, name: string, defaultValue?: any): any;
}
export default XCommand;
