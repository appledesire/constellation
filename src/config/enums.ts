export enum UrlHelper {
    success = "Insert data url. Returning data MUST be an array json with each element is key/value pair.",
    fail = "Unable to fetch data."
}

export enum Operators {
    "equal" = "Equals",
    "greater" = "GreaterThan",
    "less" = "LessThan",
    "contain" = "Contain",
    "notcontain" = "Not Contain",
    "regex" = "Regex"
}

export enum ConditionValueHelpers {
    "invalidNumber" = "Invalid number.",
    "invalidRegex" = "Invalid Regex.",
    "valid" = "Valid"
}