
import { useState } from "react";
import { Link } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, Mail, Phone, Camera, Loader2, Shield, CheckCircle2 } from "lucide-react";

import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Layout from "@/components/Layout";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const profileSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().optional(),
  bio: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const ProfileSettings = () => {
  const { session, updateProfile, verifyPhone, sendVerificationCode, enableTwoFactor, disableTwoFactor, verifyTwoFactor } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [isVerifyingPhone, setIsVerifyingPhone] = useState(false);
  const [phoneVerificationCode, setPhoneVerificationCode] = useState("");
  const [showPhoneVerification, setShowPhoneVerification] = useState(false);
  const [isTwoFactorEnabled, setIsTwoFactorEnabled] = useState(false);
  const [showTwoFactorSetup, setShowTwoFactorSetup] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState("");
  const [isVerifying2FA, setIsVerifying2FA] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: session?.user?.name || "",
      email: session?.user?.email || "",
      phone: "",
      bio: "",
    },
  });

  const onSubmit = async (data: ProfileFormValues) => {
    setIsLoading(true);
    
    try {
      await updateProfile({
        name: data.name,
        email: data.email,
      });
    } catch (error) {
      console.error("Profile update error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendVerificationCode = async () => {
    const phone = form.getValues().phone;
    
    if (!phone) {
      form.setError("phone", {
        message: "Please enter a phone number",
      });
      return;
    }
    
    setIsSendingCode(true);
    
    try {
      const success = await sendVerificationCode(phone);
      
      if (success) {
        setShowPhoneVerification(true);
      }
    } catch (error) {
      console.error("Send verification code error:", error);
    } finally {
      setIsSendingCode(false);
    }
  };

  const handleVerifyPhone = async () => {
    const phone = form.getValues().phone;
    
    if (!phone) {
      return;
    }
    
    setIsVerifyingPhone(true);
    
    try {
      await verifyPhone(phone, phoneVerificationCode);
      setShowPhoneVerification(false);
    } catch (error) {
      console.error("Phone verification error:", error);
    } finally {
      setIsVerifyingPhone(false);
    }
  };

  const handleToggleTwoFactor = async () => {
    if (isTwoFactorEnabled) {
      setIsVerifying2FA(true);
      
      try {
        await disableTwoFactor();
        setIsTwoFactorEnabled(false);
        setShowTwoFactorSetup(false);
      } catch (error) {
        console.error("Disable 2FA error:", error);
      } finally {
        setIsVerifying2FA(false);
      }
    } else {
      setIsVerifying2FA(true);
      
      try {
        await enableTwoFactor();
        setShowTwoFactorSetup(true);
      } catch (error) {
        console.error("Enable 2FA error:", error);
      } finally {
        setIsVerifying2FA(false);
      }
    }
  };

  const handleVerifyTwoFactor = async () => {
    setIsVerifying2FA(true);
    
    try {
      const success = await verifyTwoFactor(twoFactorCode);
      
      if (success) {
        setIsTwoFactorEnabled(true);
        setShowTwoFactorSetup(false);
      }
    } catch (error) {
      console.error("Verify 2FA error:", error);
    } finally {
      setIsVerifying2FA(false);
    }
  };

  if (!session?.user) {
    return (
      <Layout>
        <div className="container py-8">
          <div className="max-w-md mx-auto text-center">
            <h1 className="text-2xl font-bold mb-4">Account Required</h1>
            <p className="mb-6">You need to be logged in to access your profile settings.</p>
            <div className="space-x-4">
              <Button asChild>
                <Link to="/login">Sign in</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/register">Create account</Link>
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Profile Settings</h1>

          <Tabs defaultValue="profile">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    Update your personal information and how others see you on the platform
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center mb-6">
                    <Avatar className="h-20 w-20 mr-6">
                      <AvatarImage src={session.user.avatar} alt={session.user.name} />
                      <AvatarFallback>{session.user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <Button className="mb-2">
                        <Camera className="mr-2 h-4 w-4" />
                        Change avatar
                      </Button>
                      <p className="text-sm text-muted-foreground">
                        JPG, PNG or GIF. 1MB max.
                      </p>
                    </div>
                  </div>

                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid gap-6 sm:grid-cols-2">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                  <Input
                                    placeholder="Your name"
                                    className="pl-10"
                                    {...field}
                                  />
                                </div>
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
                              <FormLabel>
                                Email
                                {session.user.emailVerified ? (
                                  <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 border-green-200">
                                    <CheckCircle2 className="h-3 w-3 mr-1" />
                                    Verified
                                  </Badge>
                                ) : (
                                  <Badge variant="outline" className="ml-2 bg-yellow-50 text-yellow-700 border-yellow-200">
                                    Not verified
                                  </Badge>
                                )}
                              </FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                  <Input
                                    placeholder="you@example.com"
                                    className="pl-10"
                                    {...field}
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                              {!session.user.emailVerified && (
                                <Button
                                  variant="link"
                                  type="button"
                                  className="px-0 h-auto font-normal text-primary"
                                >
                                  Resend verification email
                                </Button>
                              )}
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                Phone Number
                                {session.user.phoneVerified ? (
                                  <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 border-green-200">
                                    <CheckCircle2 className="h-3 w-3 mr-1" />
                                    Verified
                                  </Badge>
                                ) : (
                                  <Badge variant="outline" className="ml-2 bg-yellow-50 text-yellow-700 border-yellow-200">
                                    Not verified
                                  </Badge>
                                )}
                              </FormLabel>
                              <FormControl>
                                <div className="flex space-x-2">
                                  <div className="relative flex-1">
                                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                      placeholder="+1 (123) 456-7890"
                                      className="pl-10"
                                      {...field}
                                    />
                                  </div>
                                  {!session.user.phoneVerified && !showPhoneVerification && (
                                    <Button
                                      type="button"
                                      variant="outline"
                                      disabled={isSendingCode}
                                      onClick={handleSendVerificationCode}
                                    >
                                      {isSendingCode ? (
                                        <>
                                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                          Sending...
                                        </>
                                      ) : (
                                        "Verify"
                                      )}
                                    </Button>
                                  )}
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {showPhoneVerification && (
                          <div className="bg-muted p-4 rounded-lg">
                            <p className="text-sm font-medium mb-3">
                              Enter the verification code sent to your phone
                            </p>
                            <div className="flex space-x-2 mb-3">
                              <InputOTP
                                maxLength={6}
                                value={phoneVerificationCode}
                                onChange={setPhoneVerificationCode}
                                render={({ slots }) => (
                                  <InputOTPGroup>
                                    {slots.map((slot, index) => (
                                      <InputOTPSlot key={index} {...slot} />
                                    ))}
                                  </InputOTPGroup>
                                )}
                              />
                            </div>
                            <div className="flex space-x-2">
                              <Button
                                type="button"
                                variant="outline"
                                className="flex-1"
                                onClick={() => setShowPhoneVerification(false)}
                              >
                                Cancel
                              </Button>
                              <Button
                                type="button"
                                className="flex-1"
                                disabled={isVerifyingPhone || phoneVerificationCode.length !== 6}
                                onClick={handleVerifyPhone}
                              >
                                {isVerifyingPhone ? (
                                  <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Verifying...
                                  </>
                                ) : (
                                  "Verify Phone"
                                )}
                              </Button>
                            </div>
                          </div>
                        )}

                        <FormField
                          control={form.control}
                          name="bio"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Bio</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Tell us about yourself"
                                  className="min-h-32"
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription>
                                This will be displayed on your public profile
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <Button type="submit" disabled={isLoading}>
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Saving changes...
                          </>
                        ) : (
                          "Save changes"
                        )}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>
                    Manage your password and security preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Password</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Change your password or update your password recovery options
                    </p>
                    <Button variant="outline">
                      Change password
                    </Button>
                  </div>

                  <Separator />

                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-medium">Two-factor authentication</h3>
                        <p className="text-sm text-muted-foreground">
                          Add an extra layer of security to your account
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={isTwoFactorEnabled}
                          onCheckedChange={handleToggleTwoFactor}
                          disabled={isVerifying2FA}
                        />
                        <span className="text-sm font-medium">
                          {isTwoFactorEnabled ? "Enabled" : "Disabled"}
                        </span>
                      </div>
                    </div>

                    {showTwoFactorSetup && (
                      <div className="bg-muted p-4 rounded-lg">
                        <div className="space-y-4">
                          <div className="flex items-center">
                            <div className="bg-card p-4 rounded-lg border mr-4">
                              <img
                                src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=otpauth://totp/AirbnbClone:demo@example.com?secret=JBSWY3DPEHPK3PXP&issuer=AirbnbClone"
                                alt="QR Code"
                                width="150"
                                height="150"
                              />
                            </div>
                            <div>
                              <h4 className="font-medium mb-2">Scan QR code</h4>
                              <p className="text-sm text-muted-foreground mb-2">
                                Scan this QR code with your authenticator app (Google Authenticator, Authy, etc.)
                              </p>
                              <p className="text-sm font-medium">Manual entry code:</p>
                              <p className="font-mono bg-background p-2 rounded border text-sm mb-2">
                                JBSWY3DPEHPK3PXP
                              </p>
                              <Button variant="outline" size="sm">
                                <Camera className="h-4 w-4 mr-2" />
                                Can't scan QR code?
                              </Button>
                            </div>
                          </div>

                          <div>
                            <p className="text-sm font-medium mb-2">
                              Enter the 6-digit code from your authenticator app
                            </p>
                            <div className="flex space-x-2 mb-4">
                              <InputOTP
                                maxLength={6}
                                value={twoFactorCode}
                                onChange={setTwoFactorCode}
                                render={({ slots }) => (
                                  <InputOTPGroup>
                                    {slots.map((slot, index) => (
                                      <InputOTPSlot key={index} {...slot} />
                                    ))}
                                  </InputOTPGroup>
                                )}
                              />
                            </div>
                            <div className="flex space-x-2">
                              <Button
                                variant="outline"
                                className="flex-1"
                                onClick={() => setShowTwoFactorSetup(false)}
                              >
                                Cancel
                              </Button>
                              <Button
                                className="flex-1"
                                disabled={isVerifying2FA || twoFactorCode.length !== 6}
                                onClick={handleVerifyTwoFactor}
                              >
                                {isVerifying2FA ? (
                                  <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Verifying...
                                  </>
                                ) : (
                                  "Verify and Enable"
                                )}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-medium mb-2">Connected Accounts</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Manage third-party accounts connected to your profile
                    </p>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center">
                          <div className="bg-[#4285F4] text-white p-2 rounded-full mr-4">
                            <svg className="h-5 w-5" viewBox="0 0 24 24">
                              <path
                                fill="currentColor"
                                d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27 3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10 5.35 0 9.25-3.67 9.25-9.09 0-1.15-.15-1.81-.15-1.81Z"
                              />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium">Google</h4>
                            <p className="text-sm text-muted-foreground">
                              Not connected
                            </p>
                          </div>
                        </div>
                        <Button variant="outline">Connect</Button>
                      </div>

                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center">
                          <div className="bg-[#1877F2] text-white p-2 rounded-full mr-4">
                            <svg className="h-5 w-5" viewBox="0 0 24 24">
                              <path
                                fill="currentColor"
                                d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"
                              />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium">Facebook</h4>
                            <p className="text-sm text-muted-foreground">
                              Not connected
                            </p>
                          </div>
                        </div>
                        <Button variant="outline">Connect</Button>
                      </div>

                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center">
                          <div className="bg-black text-white p-2 rounded-full mr-4">
                            <svg className="h-5 w-5" viewBox="0 0 24 24">
                              <path
                                fill="currentColor"
                                d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"
                              />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium">Twitter</h4>
                            <p className="text-sm text-muted-foreground">
                              Connected as @johndoe
                            </p>
                          </div>
                        </div>
                        <Button variant="outline">Disconnect</Button>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-medium mb-2">Login Activity</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Review your recent login activity
                    </p>
                    
                    <div className="space-y-4">
                      <div className="p-4 border rounded-lg">
                        <div className="flex justify-between mb-2">
                          <div className="font-medium">Current session</div>
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            Active now
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground mb-2">
                          <div className="flex items-center">
                            <Shield className="h-4 w-4 mr-2" />
                            Chrome on Windows • New York, USA
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Started on May 20, 2023 at 10:45 AM
                        </div>
                      </div>
                      
                      <Button variant="outline" className="w-full">
                        View all activity
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="preferences">
              <Card>
                <CardHeader>
                  <CardTitle>Preferences</CardTitle>
                  <CardDescription>
                    Manage your notification and privacy settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Notifications</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Choose how and when you want to be notified
                    </p>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Email notifications</p>
                          <p className="text-sm text-muted-foreground">
                            Receive emails about your account activity
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">SMS notifications</p>
                          <p className="text-sm text-muted-foreground">
                            Receive text messages for important updates
                          </p>
                        </div>
                        <Switch />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Browser notifications</p>
                          <p className="text-sm text-muted-foreground">
                            Receive notifications in your browser
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Marketing emails</p>
                          <p className="text-sm text-muted-foreground">
                            Receive emails about new features and promotions
                          </p>
                        </div>
                        <Switch />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-medium mb-2">Privacy</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Control your privacy settings and data usage
                    </p>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Profile visibility</p>
                          <p className="text-sm text-muted-foreground">
                            Make your profile visible to other users
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Search engines indexing</p>
                          <p className="text-sm text-muted-foreground">
                            Allow search engines to index your profile
                          </p>
                        </div>
                        <Switch />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Data analytics</p>
                          <p className="text-sm text-muted-foreground">
                            Allow us to collect anonymous usage data
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save preferences</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default ProfileSettings;
