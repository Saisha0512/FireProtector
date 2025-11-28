import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Phone, Mail, MapPin, Users, Flame } from "lucide-react";

const Home = () => {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary/20 via-background to-destructive/10 rounded-xl p-8 border border-border">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 rounded-full bg-primary">
            <Shield className="h-8 w-8 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-4xl font-bold">FireProtect</h1>
            <p className="text-muted-foreground">Advanced Fire Defence Monitoring System</p>
          </div>
        </div>
        <p className="text-lg max-w-3xl">
          Protecting lives and property through real-time fire detection, instant alerts, and rapid response coordination.
        </p>
      </div>

      {/* Vision & Mission */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Flame className="h-5 w-5 text-primary" />
              Our Vision
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              To create a safer world by leveraging cutting-edge technology for proactive fire detection and prevention, 
              ensuring rapid response times and minimizing casualties and property damage across all communities.
            </p>
          </CardContent>
        </Card>

        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Our Mission
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Empowering fire brigades, officers, and local authorities with intelligent monitoring systems that provide 
              real-time insights, predictive analytics, and seamless coordination for effective fire management and emergency response.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Fire Brigade Images Grid */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Our Heroes in Action</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="overflow-hidden">
            <div className="h-48 bg-gradient-to-br from-destructive/30 to-primary/20 flex items-center justify-center">
              <Flame className="h-20 w-20 text-destructive opacity-50" />
            </div>
            <CardContent className="pt-4">
              <p className="font-medium">Rapid Response Teams</p>
              <p className="text-sm text-muted-foreground">24/7 emergency response</p>
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <div className="h-48 bg-gradient-to-br from-primary/30 to-destructive/20 flex items-center justify-center">
              <Shield className="h-20 w-20 text-primary opacity-50" />
            </div>
            <CardContent className="pt-4">
              <p className="font-medium">Advanced Equipment</p>
              <p className="text-sm text-muted-foreground">State-of-the-art gear</p>
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <div className="h-48 bg-gradient-to-br from-destructive/20 to-primary/30 flex items-center justify-center">
              <Users className="h-20 w-20 text-primary opacity-50" />
            </div>
            <CardContent className="pt-4">
              <p className="font-medium">Trained Professionals</p>
              <p className="text-sm text-muted-foreground">Expert firefighters</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle>Contact & Emergency Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-primary mt-1" />
              <div>
                <p className="font-medium">Emergency Hotline</p>
                <p className="text-muted-foreground">101 (Available 24/7)</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-primary mt-1" />
              <div>
                <p className="font-medium">Email Support</p>
                <p className="text-muted-foreground">support@fireprotect.in</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-primary mt-1" />
              <div>
                <p className="font-medium">Headquarters</p>
                <p className="text-muted-foreground">Delhi Fire Services, India</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Features */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-primary mb-2">24/7</div>
            <p className="text-sm text-muted-foreground">Real-time Monitoring</p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-primary mb-2">&lt;5min</div>
            <p className="text-sm text-muted-foreground">Response Time</p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-primary mb-2">50+</div>
            <p className="text-sm text-muted-foreground">Active Locations</p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-primary mb-2">98%</div>
            <p className="text-sm text-muted-foreground">Success Rate</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Home;
