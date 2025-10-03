'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Eye, EyeOff, Mail, Lock } from 'lucide-react'
import Logo from '../../components/Logo'

export default function Authentication() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Platform Description */}
        <div className="space-y-8">
          <div className="text-center lg:text-left">
            <Logo size="lg" className="justify-center lg:justify-start mb-8" />
            <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
              Virtual Production
              <span className="block text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
                Made Simple
              </span>
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              Streamline your creative workflow with our comprehensive platform for project management, 
              asset tracking, and real-time collaboration in virtual production environments.
            </p>
          </div>

          <div className="grid gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Logo size="sm" showText={false} />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">Project Management</h3>
                <p className="text-slate-600">Organize scenes, sequences, and shooting days with intelligent task tracking.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Logo size="sm" showText={false} />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">Asset Database</h3>
                <p className="text-slate-600">Centralized asset management with AI-powered categorization and previews.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Logo size="sm" showText={false} />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">Real-time Collaboration</h3>
                <p className="text-slate-600">Connect your team with instant updates and seamless communication tools.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="flex justify-center lg:justify-end">
          <Card className="w-full max-w-md bg-white/80 backdrop-blur-sm shadow-2xl border-0">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-2xl font-bold text-slate-900">Welcome Back</CardTitle>
              <CardDescription className="text-slate-600">
                Sign in to your StratoPipe account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-700 font-medium">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-slate-700 font-medium">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10 bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Link href="/StudioDashboard">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200">
                    Sign In
                  </Button>
                </Link>

                <div className="text-center">
                  <span className="text-slate-600">Don't have an account? </span>
                  <Link href="/Registration" className="text-blue-600 hover:text-blue-700 font-medium">
                    Sign up
                  </Link>
                </div>
              </div>

              <div className="text-center pt-4 border-t border-slate-200">
                <a href="#" className="text-sm text-slate-500 hover:text-slate-700">
                  Forgot your password?
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}