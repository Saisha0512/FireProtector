import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface SolvedCase {
  id: string;
  location_id: string;
  alert_type: "fire" | "gas" | "temp" | "motion";
  timestamp: string;
  resolved_at: string;
  severity: "low" | "medium" | "high" | "critical";
  status: string;
  notes: string;
  locations: { name: string; region: string };
  sensor_values: any;
}

const SolvedCases = () => {
  const { toast } = useToast();
  const [solvedCases, setSolvedCases] = useState<SolvedCase[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSolvedCases();
  }, []);

  const fetchSolvedCases = async () => {
    try {
      const { data, error } = await supabase
        .from("alerts")
        .select("*, locations(name, region)")
        .eq("status", "resolved")
        .order("resolved_at", { ascending: false });

      if (error) throw error;

      setSolvedCases((data || []) as SolvedCase[]);
    } catch (error) {
      toast({
        title: "Error fetching solved cases",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <CheckCircle className="h-8 w-8 text-status-normal" />
        <div>
          <h1 className="text-3xl font-bold">Solved Cases</h1>
          <p className="text-muted-foreground">Historical record of successfully resolved alerts</p>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-status-normal">{solvedCases.length}</div>
            <p className="text-sm text-muted-foreground">Total Solved</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">
              {solvedCases.filter(c => c.alert_type === "fire").length}
            </div>
            <p className="text-sm text-muted-foreground">Fire Incidents</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">
              {solvedCases.filter(c => c.severity === "critical").length}
            </div>
            <p className="text-sm text-muted-foreground">Critical Cases</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">
              {solvedCases.filter(c => {
                const resolvedTime = new Date(c.resolved_at).getTime();
                const alertTime = new Date(c.timestamp).getTime();
                return (resolvedTime - alertTime) / 1000 / 60 < 30; // Less than 30 minutes
              }).length}
            </div>
            <p className="text-sm text-muted-foreground">Quick Response (&lt;30min)</p>
          </CardContent>
        </Card>
      </div>

      {/* Cases List */}
      <div className="space-y-4">
        {loading ? (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              Loading solved cases...
            </CardContent>
          </Card>
        ) : solvedCases.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              No solved cases yet.
            </CardContent>
          </Card>
        ) : (
          solvedCases.map((caseItem) => (
            <Card key={caseItem.id} className="border-l-4 border-l-status-normal">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-status-normal" />
                      {caseItem.locations?.name}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">{caseItem.locations?.region}</p>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="outline">{caseItem.alert_type.toUpperCase()}</Badge>
                    <Badge>{caseItem.severity}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="text-sm font-medium mb-1">Alert Time</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(caseItem.timestamp).toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(caseItem.timestamp), { addSuffix: true })}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-1">Resolved Time</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(caseItem.resolved_at).toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Response Time: {Math.round((new Date(caseItem.resolved_at).getTime() - new Date(caseItem.timestamp).getTime()) / 1000 / 60)} minutes
                    </p>
                  </div>

                  {caseItem.sensor_values && (
                    <div className="md:col-span-2">
                      <p className="text-sm font-medium mb-2">Sensor Values at Time of Alert</p>
                      <div className="grid gap-2 md:grid-cols-5 text-sm">
                        <div className="p-2 bg-muted/30 rounded">
                          <p className="text-xs text-muted-foreground">Temperature</p>
                          <p className="font-medium">{caseItem.sensor_values.temperature}°C</p>
                        </div>
                        <div className="p-2 bg-muted/30 rounded">
                          <p className="text-xs text-muted-foreground">Humidity</p>
                          <p className="font-medium">{caseItem.sensor_values.humidity}%</p>
                        </div>
                        <div className="p-2 bg-muted/30 rounded">
                          <p className="text-xs text-muted-foreground">Flame</p>
                          <p className="font-medium">{caseItem.sensor_values.flame ? "Detected" : "None"}</p>
                        </div>
                        <div className="p-2 bg-muted/30 rounded">
                          <p className="text-xs text-muted-foreground">Gas</p>
                          <p className="font-medium">{caseItem.sensor_values.gas}</p>
                        </div>
                        <div className="p-2 bg-muted/30 rounded">
                          <p className="text-xs text-muted-foreground">PIR</p>
                          <p className="font-medium">{caseItem.sensor_values.pir ? "Motion" : "None"}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {caseItem.notes && (
                    <div className="md:col-span-2">
                      <p className="text-sm font-medium mb-1">Notes</p>
                      <p className="text-sm text-muted-foreground">{caseItem.notes}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Raw Data Table */}
      <Card>
        <CardHeader>
          <CardTitle>Raw Data Export</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">ID</th>
                  <th className="text-left p-2">Location</th>
                  <th className="text-left p-2">Type</th>
                  <th className="text-left p-2">Severity</th>
                  <th className="text-left p-2">Alert Time</th>
                  <th className="text-left p-2">Resolved Time</th>
                  <th className="text-left p-2">Response Time (min)</th>
                </tr>
              </thead>
              <tbody>
                {solvedCases.map((caseItem, index) => (
                  <tr key={caseItem.id} className={index % 2 === 0 ? "bg-muted/20" : ""}>
                    <td className="p-2 font-mono text-xs">{caseItem.id.slice(0, 8)}</td>
                    <td className="p-2">{caseItem.locations?.name}</td>
                    <td className="p-2">{caseItem.alert_type}</td>
                    <td className="p-2">{caseItem.severity}</td>
                    <td className="p-2">{new Date(caseItem.timestamp).toLocaleString()}</td>
                    <td className="p-2">{new Date(caseItem.resolved_at).toLocaleString()}</td>
                    <td className="p-2">
                      {Math.round((new Date(caseItem.resolved_at).getTime() - new Date(caseItem.timestamp).getTime()) / 1000 / 60)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SolvedCases;
