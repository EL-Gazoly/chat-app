"use client";
import { useTransition, useReducer } from 'react';
import FormWrapper from '@/components/FormWrapper';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema } from "@/schema";
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

type State = {
    error: string;
    success: string;
};

type Action = {
    type: 'ERROR' | 'SUCCESS' | 'RESET';
    payload: string;
};

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'ERROR':
            return { ...state, error: action.payload };
        case 'SUCCESS':
            return { ...state, success: action.payload };
        case 'RESET':
            return { error: '', success: '' };
        default:
            return state;
    }
};

const LoginForm = () => {
    const [state, dispatch] = useReducer(reducer, { error: '', success: '' });
    const [isPending, startTransition] = useTransition();
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: { email: '', password: '' }
    });

    const handleOnSubmit = (values: z.infer<typeof LoginSchema>) => {
        dispatch({ type: 'RESET', payload: '' });
        startTransition(() => {
            const validateFields = LoginSchema.safeParse(values);
            if (!validateFields.success) {
                dispatch({ type: 'ERROR', payload: 'Invalid form submission' });
                return;
            }
            dispatch({ type: 'SUCCESS', payload: 'Form submitted successfully' });
        });
    };

    return (
        <FormWrapper
            headerLabel="Nice to see you again"
            backButtonText="Don’t have an account? "
            backButtonLabel="Sign Up"
            backButtonHref="/auth/register"
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleOnSubmit)} className="space-y-6">
                    <div className="space-y-4 w-[360px]">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="email"
                                            disabled={isPending}
                                            placeholder="Enter email"
                                            className="bg-[#F2F2F2] focus:border focus:border-[#4285F4]"
                                        />
                                    </FormControl>
                                    <FormMessage>
                                        {form.formState.errors.email?.message}
                                    </FormMessage>
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
                                        <Input
                                            {...field}
                                            type="password"
                                            disabled={isPending}
                                            placeholder="Enter password"
                                            className="bg-[#F2F2F2] focus:border focus:border-[#4285F4]"
                                        />
                                    </FormControl>
                                    <FormMessage>
                                        {form.formState.errors.password?.message}
                                    </FormMessage>
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormErrorMessage message={state.error} />
                    <FormSuccessMessage message={state.success} />
                    <Button type="submit" size="lg" className="w-full">
                        Sign In
                    </Button>
                </form>
            </Form>
        </FormWrapper>
    );
};

export default LoginForm;
