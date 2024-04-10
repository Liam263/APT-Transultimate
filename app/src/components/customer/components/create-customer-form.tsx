"use client";

import { cn } from "@/lib/utils";
import { Icons } from "../../icon";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";

import { Separator } from "@/components/ui/separator";
import { phoneRegex } from "@/helpers/common";
import { queryClient } from "@/providers/client";
import { createCustomer, Customer } from "@/services/customer";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Rocket, Upload } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { AlertError } from "../../alert";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import AvatarPlaceholder from "./../../../../public/images/avatar-placeholder.png";
import CompnayPlaceholder from "./../../../../public/images/placeholder-square.png";

interface CreateCustomerFormProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const FormSchema = z
  .object({
    businessName: z.string(),
    fullName: z.string(),
    abn: z.string(),
    contactName: z.string(),
    companyLogo: z.string().optional(),
    photoUrl: z.string().optional(),
    mobile: z.string().regex(phoneRegex, "Invalid Number!"),
    email: z
      .string()
      .min(1, { message: "This field is required!" })
      .email("This is not a valid email."),
    password: z.string().min(8, {
      message: "Your password must be at least 8 characters.",
    }),
    confirmPassword: z.string().min(8, {
      message: "Your password must be at least 8 characters.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export function CreateCustomerForm({
  className,
  ...props
}: CreateCustomerFormProps) {
  const [errMessage, setErrMessage] = useState("");
  const [fileAvatarPreview, setFileAvatarPreview] = useState<string>("");
  const [fileCompanyPreview, setFileCompanyPreview] = useState<string>("");
  const [fileAvatarUpload, setFileAvatarUpload] = useState<File>();
  const [fileCompanyUpload, setFileCompanyUpload] = useState<File>();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      abn: "",
      businessName: "",
      companyLogo: "",
      confirmPassword: "",
      contactName: "",
      fullName: "",
      email: "",
      password: "",
      mobile: "",
      photoUrl: "",
    },
  });

  const createCustomerMutation = useMutation({
    mutationFn: (customerData: Customer) => createCustomer(customerData),
    mutationKey: ["create-customer"],
    onSuccess(data, _variables, _context) {
      if (data.status) {
        queryClient.invalidateQueries({ queryKey: ["customer"] });

        toast("Create customer sucessfully", {
          description: "Please go to customer list to check your new customer",
          duration: 5000,
          icon: <Rocket />,
          position: "top-right",
        });

        form.reset();
      }
    },
    onError: (_error, _variables, _context) => {
      setErrMessage("Can't create the customer");
    },
  });

  const handleAvatarUploadImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];
    setFileAvatarUpload(file);
    file && setFileAvatarPreview(URL.createObjectURL(file));
  };

  const handleCompanyUploadImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];
    setFileCompanyUpload(file);
    file && setFileCompanyPreview(URL.createObjectURL(file));
  };

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    createCustomerMutation.mutate(data as unknown as Customer);
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-3 grid grid-cols-3 gap-4"
        >
          <div className="grid col-span-2 gap-4">
            <div className="grid grid-cols-[200px_minmax(900px,_1fr)] gap-4">
              <div>
                <div className="relative rounded-sm overflow-hidden items-center gap-1.5 mb-2">
                  <Image
                    id="upload-company"
                    src={
                      fileCompanyUpload
                        ? fileCompanyPreview
                        : CompnayPlaceholder
                    }
                    width={200}
                    height={200}
                    alt="file-preview"
                    className="overflow-hidden"
                  />
                </div>
                <div className="relative flex justify-center">
                  <Button className="flex items-center gap-2">
                    <Upload size={16} />
                    Upload company logo
                  </Button>
                  <Input
                    onChange={handleCompanyUploadImage}
                    className="absolute top-0 left-0 opacity-0"
                    id="picture"
                    type="file"
                  />
                </div>
              </div>
              <div className="bg-slate-50 p-4 rounded-sm grid grid-cols-[1fr_max(160px)] gap-4 border-dashed border-2 border-black">
                <div>
                  <h3 className="text-md mb-2 font-bold">Owner</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Fullname</FormLabel>
                          <FormControl>
                            <Input placeholder="fullname" {...field} />
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
                            <Input placeholder="name@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="password"
                              type="password"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm password</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="confirm password"
                              type="password"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div>
                  <div className="relative rounded-full overflow-hidden items-center gap-1.5 mb-2 border-dashed border-2">
                    <Image
                      id="upload-avatar"
                      src={
                        fileAvatarUpload ? fileAvatarPreview : AvatarPlaceholder
                      }
                      width={160}
                      height={160}
                      alt="file-preview"
                      className="overflow-hidden"
                    />
                  </div>
                  <div className="relative flex justify-center">
                    <Button className="flex items-center gap-2">
                      <Upload size={16} />
                      Upload avatar
                    </Button>
                    <Input
                      onChange={handleAvatarUploadImage}
                      className="absolute top-0 left-0 opacity-0"
                      id="picture"
                      type="file"
                    />
                  </div>
                </div>
              </div>
            </div>
            <FormField
              control={form.control}
              name="businessName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business name</FormLabel>
                  <FormControl>
                    <Input placeholder="logictics" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="abn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ABN</FormLabel>
                  <FormControl>
                    <Input placeholder="ABN" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="contactName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact name</FormLabel>
                    <FormControl>
                      <Input placeholder="contact name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="mobile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="phone" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Separator />

            <Button
              disabled={form.formState.isSubmitting}
              type="submit"
              className="w-auto mt-4"
              size="lg"
            >
              {form.formState.isSubmitting ? (
                <Icons.spinner className="mr-2 h-4 w-full animate-spin" />
              ) : (
                "Create customer"
              )}
            </Button>
          </div>
        </form>

        <AlertError errMessage={errMessage} />
      </Form>
    </div>
  );
}
