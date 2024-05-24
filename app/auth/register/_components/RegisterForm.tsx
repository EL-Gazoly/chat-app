"use client";
import { useTransition, useReducer } from 'react';
import { useForm } from 'react-hook-form';
import FormWrapper from '@/components/FormWrapper';
import { Input } from '@/components/ui/input';
import { 
    Form,
    FormField,
    FormLabel,
    FormControl,
    FormItem,
    FormMessage
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import FormErrorMessage from '@/components/form-error-message';
import FormSuccessMessage from '@/components/form-success-message';
import { RegisterSchema } from '@/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

type State = {
    error: string;
    success: string;
};

type Action = {
    type: 'ERROR' | 'SUCCESS' | 'RESET';
    payload: string;
};

const reducer = (state: State, action: Action) => {
    switch (action.type) {
        case "ERROR":
            return { ...state, error: action.payload };
        case "SUCCESS":
            return { ...state, success: action.payload };
        case "RESET":
            return { error: "", success: "" };
        default:
            return state;
    }
};

const RegisterForm = () => {
    const [state, dispatch] = useReducer(reducer, { error: "", success: "" });
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: { name: '', email: '', password: '' }
    });

    const handleOnSubmit = (values: z.infer<typeof RegisterSchema>) => {
        dispatch({ type: "RESET", payload: "" });
        startTransition(() => {
            const validateFields = RegisterSchema.safeParse(values);
            if (!validateFields.success) {
                dispatch({ type: "ERROR", payload: "Invalid form submission" });
                return;
            }
            dispatch({ type: "SUCCESS", payload: "Form submitted successfully" });
        });
    };

    return (
        <FormWrapper 
            headerLabel="Create an account"
            backButtonLabel="Login here"
            backButtonHref="/auth/login"
            backButtonText="Already have an account?"
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleOnSubmit)} className="space-y-6">
                    <div className="space-y-4 w-[360px]">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="name">Name</FormLabel>
                                    <FormControl>
                                        <Input {...field}
                                            id="name"
                                            type="text"
                                            placeholder="Enter your name"
                                            disabled={isPending}
                                            className='bg-[#F2F2F2] focus:border focus:border-[#4285F4]'
                                         />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input {...field}
                                            type="email"
                                            placeholder="Enter your email"
                                            disabled={isPending}
                                            className='bg-[#F2F2F2] focus:border focus:border-[#4285F4]'
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input {...field}
                                            type="password"
                                            placeholder="Enter your password"
                                            disabled={isPending}
                                            className='bg-[#F2F2F2] focus:border focus:border-[#4285F4]'
                                         />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormErrorMessage message={state.error} />
                    <FormSuccessMessage message={state.success} />
                    <Button type="submit" size="lg" className="w-full">Create an account</Button>
                </form>
            </Form>
        </FormWrapper>
    );
};

export default RegisterForm;
