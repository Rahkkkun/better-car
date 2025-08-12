"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";

import {
  Save,
  Clock,
  Loader2,
  Users,
  Shield,
  UserX,
  CheckCircle,
  Search,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useFetch from "@/hooks/use-fetch";
import {
  getDealershipInfo,
  saveWorkingHours,
  getUsers,
  updateUserRole,
} from "@/actions/settings";

// Day names for display
const DAYS = [
  { value: "MONDAY", label: "Monday" },
  { value: "TUESDAY", label: "Tuesday" },
  { value: "WEDNESDAY", label: "Wednesday" },
  { value: "THURSDAY", label: "Thursday" },
  { value: "FRIDAY", label: "Friday" },
  { value: "SATURDAY", label: "Saturday" },
  { value: "SUNDAY", label: "Sunday" },
];

export const SettingsForm = () => {
  const [workingHours, setWorkingHours] = useState(
    DAYS.map((day) => ({
      dayOfWeek: day.value,
      openTime: "09:00",
      closeTime: "18:00",
      isOpen: day.value !== "SUNDAY",
    }))
  );

  const [userSearch, setUserSearch] = useState("");
  const [confirmAdminDialog, setConfirmAdminDialog] = useState(false);
  const [userToPromote, setUserToPromote] = useState(null);
  const [confirmRemoveDialog, setConfirmRemoveDialog] = useState(false);
  const [userToDemote, setUserToDemote] = useState(null);

  // Custom hooks for API calls
  const {
    loading: fetchingSettings,
    fn: fetchDealershipInfo,
    data: settingsData,
    error: settingsError,
  } = useFetch(getDealershipInfo);

  const {
    loading: savingHours,
    fn: saveHours,
    data: saveResult,
    error: saveError,
  } = useFetch(saveWorkingHours);

  const {
    loading: fetchingUsers,
    fn: fetchUsers,
    data: usersData,
    error: usersError,
  } = useFetch(getUsers);

  const {
    loading: updatingRole,
    fn: updateRole,
    data: updateResult,
    error: updateError,
  } = useFetch(updateUserRole);

  // Load initial data
  useEffect(() => {
    fetchDealershipInfo();
    fetchUsers();
  }, []);

  // Handle working hour changes
  const handleWorkingHourChange = (index, field, value) => {
    const newWorkingHours = [...workingHours];
    newWorkingHours[index] = { ...newWorkingHours[index], [field]: value };
    setWorkingHours(newWorkingHours);
  };

  // Save working hours
  const handleSaveHours = async () => {
    await saveHours(workingHours);
    if (saveResult?.success) {
      toast.success("Working hours saved successfully!");
    }
  };

  // Make user admin
  const handleMakeAdmin = async () => {
    if (!userToPromote) return;
    await updateRole(userToPromote.id, "ADMIN");
  };

  // Remove admin privileges
  const handleRemoveAdmin = async () => {
    if (!userToDemote) return;
    await updateRole(userToDemote.id, "USER");
  };

  // Filter users by search term
  const filteredUsers = usersData?.success
    ? usersData.data.filter(
        (user) =>
          user.name?.toLowerCase().includes(userSearch.toLowerCase()) ||
          user.email.toLowerCase().includes(userSearch.toLowerCase())
      )
    : [];

  return (
    <div className="space-y-6">
      <Tabs defaultValue="hours">
        <TabsList>
          <TabsTrigger value="hours">
            <Clock className="h-4 w-4 mr-2" />
            Working Hours
          </TabsTrigger>
          <TabsTrigger value="admins">
            <Shield className="h-4 w-4 mr-2" />
            Admin Users
          </TabsTrigger>
        </TabsList>

        <TabsContent value="hours" className="space-y-6 mt-6">
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Working Hours</CardTitle>
                <CardDescription>
                  Set your dealership's working hours for each day of the week.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {DAYS.map((day, index) => (
                    <div
                      key={day.value}
                      className="grid grid-cols-12 gap-4 items-center py-3 px-4 rounded-lg hover:bg-slate-50 dark:hover:bg-gray-800 transition-colors duration-200"
                    >
                      <div className="col-span-3 md:col-span-2">
                        <div className="font-medium">{day.label}</div>
                      </div>

                      <div className="col-span-9 md:col-span-2 flex items-center">
                        <Checkbox
                          id={`is-open-${day.value}`}
                          checked={workingHours[index]?.isOpen}
                          onCheckedChange={(checked) => {
                            handleWorkingHourChange(index, "isOpen", checked);
                          }}
                        />
                        <Label
                          htmlFor={`is-open-${day.value}`}
                          className="ml-2 cursor-pointer"
                        >
                          {workingHours[index]?.isOpen ? "Open" : "Closed"}
                        </Label>
                      </div>

                      {workingHours[index]?.isOpen && (
                        <>
                          <div className="col-span-5 md:col-span-4">
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 text-gray-400 mr-2" />
                              <Input
                                type="time"
                                value={workingHours[index]?.openTime}
                                onChange={(e) =>
                                  handleWorkingHourChange(
                                    index,
                                    "openTime",
                                    e.target.value
                                  )
                                }
                                className="text-sm"
                              />
                            </div>
                          </div>

                          <div className="col-span-4 md:col-span-4">
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 text-gray-400 mr-2" />
                              <Input
                                type="time"
                                value={workingHours[index]?.closeTime}
                                onChange={(e) =>
                                  handleWorkingHourChange(
                                    index,
                                    "closeTime",
                                    e.target.value
                                  )
                                }
                                className="text-sm"
                              />
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex justify-end">
                  <Button
                    onClick={handleSaveHours}
                    disabled={savingHours}
                    className="flex items-center gap-2"
                  >
                    {savingHours ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Save className="h-4 w-4" />
                    )}
                    Save Hours
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="admins" className="space-y-6 mt-6">
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Admin Users</CardTitle>
                <CardDescription>
                  Manage users with admin privileges.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6 relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    type="search"
                    placeholder="Search users..."
                    className="pl-9 w-full"
                    value={userSearch}
                    onChange={(e) => setUserSearch(e.target.value)}
                  />
                </div>

                {fetchingUsers ? (
                  <div className="py-12 flex justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                  </div>
                ) : usersData?.success && filteredUsers.length > 0 ? (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>User</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Role</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredUsers.map((user) => (
                          <TableRow key={user.id}>
                            <TableCell className="font-medium">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                                  {user.imageUrl ? (
                                    <img
                                      src={user.imageUrl}
                                      alt={user.name || "User"}
                                      className="w-full h-full object-cover"
                                    />
                                  ) : (
                                    <Users className="h-4 w-4 text-gray-500" />
                                  )}
                                </div>
                                <span>{user.name || "Unnamed User"}</span>
                              </div>
                            </TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                              <Badge
                                className={
                                  user.role === "ADMIN"
                                    ? "bg-green-800"
                                    : "bg-gray-800"
                                }
                              >
                                {user.role}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              {user.role === "ADMIN" ? (
                                <div>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-red-600"
                                    onClick={() => {
                                      setUserToDemote(user);
                                      setConfirmRemoveDialog(true);
                                    }}
                                    disabled={updatingRole}
                                  >
                                    <UserX className="h-4 w-4 mr-2" />
                                    Remove Admin
                                  </Button>
                                </div>
                              ) : (
                                <div>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-green-600"
                                    onClick={() => {
                                      setUserToPromote(user);
                                      setConfirmAdminDialog(true);
                                    }}
                                    disabled={updatingRole}
                                  >
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                    Make Admin
                                  </Button>
                                </div>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : usersData?.success && filteredUsers.length === 0 ? (
                  <div className="py-12 text-center text-gray-500">
                    {userSearch ? "No users found matching your search." : "No users found."}
                  </div>
                ) : usersError ? (
                  <div className="py-12 text-center text-red-500">
                    Error loading users. Please try again.
                  </div>
                ) : null}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Confirm Make Admin Dialog */}
      <Dialog open={confirmAdminDialog} onOpenChange={setConfirmAdminDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Admin Promotion</DialogTitle>
            <DialogDescription>
              Are you sure you want to make{" "}
              <span className="font-semibold">
                {userToPromote?.name || userToPromote?.email}
              </span>{" "}
              an admin? This user will have full access to the admin panel.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setConfirmAdminDialog(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleMakeAdmin} disabled={updatingRole}>
              {updatingRole ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : null}
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirm Remove Admin Dialog */}
      <Dialog open={confirmRemoveDialog} onOpenChange={setConfirmRemoveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Admin Removal</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove admin privileges from{" "}
              <span className="font-semibold">
                {userToDemote?.name || userToDemote?.email}
              </span>
              ? This user will lose access to the admin panel.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setConfirmRemoveDialog(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleRemoveAdmin}
              disabled={updatingRole}
            >
              {updatingRole ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : null}
              Remove Admin
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};