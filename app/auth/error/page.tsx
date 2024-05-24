import FormWrapper from "@/components/FormWrapper"
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"

const AuthErrorPage = () => {
  return (
    <FormWrapper
        headerLabel="Oops! Something went wrong"
        backButtonLabel="Back to Login"
        backButtonHref="/auth/login"
        showSocial={false}
    >
        <div className=" w-full text-destructive flex items-center justify-center">
            <ExclamationTriangleIcon className=" h-5 w-5" />
        </div>


    </FormWrapper>
   ) 
  
}

export default AuthErrorPage
