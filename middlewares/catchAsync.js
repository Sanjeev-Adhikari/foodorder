export const handleErrors = (fn)=>{
    return (req, res, next)=>{
        fn(req, res, next).catch((err)=>{
            return res.status(500).json({
                message: "Internal server error",
                errorMessage: err.message
            })
        })
    }
}

