"use client";
import { FlexColStart, FlexRowCenter, FlexRowEnd } from "@/components/Flex";
import { OnlyAdminHOF } from "@/components/ProtectedComp";
import DashboardLayout from "@/components/dashboard/Layouts/DashboardLayout";
import { LayoutContext } from "@/context/LayoutContext";
import React, { useContext } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Button from "@/components/ui/button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteFromWaitlist, getWaitlist } from "@/http/requests";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Spinner } from "@/components/Spinner";
import useTheme from "@/hooks/useTheme";

dayjs.extend(relativeTime);

function WaitlistMainPage() {
  const { setActivePage } = useContext(LayoutContext);
  const { theme } = useTheme();
  const [waitlist, setWaitlist] = React.useState<
    { email: string; date: string; id: string }[]
  >([]);
  const [loading, setLoading] = React.useState<
    {
      id: any;
      loading: boolean;
    }[]
  >([]);
  const getWaitlistQuery = useQuery({
    queryKey: ["waitlist"],
    queryFn: async () => getWaitlist(),
  });
  const deleteWaitlistUserMutation = useMutation({
    mutationFn: async (email: string) => deleteFromWaitlist(email),
  });

  // set active page
  setActivePage("waitlist");

  React.useEffect(() => {
    if (getWaitlistQuery.error) {
      const errMsg = (getWaitlistQuery.error as any)?.response?.data?.message;
      toast.error(errMsg);
    }

    if (getWaitlistQuery.data) {
      const { data } = getWaitlistQuery.data;
      setWaitlist(data);
    }
  }, [
    getWaitlistQuery.error,
    getWaitlistQuery.isPending,
    getWaitlistQuery.data,
  ]);

  //   effect for deleting waitlist user
  React.useEffect(() => {
    if (deleteWaitlistUserMutation.error) {
      const errMsg = (deleteWaitlistUserMutation.error as any)?.response?.data
        ?.message;
      toast.error(errMsg);
      setLoading([]);
    }
    if (deleteWaitlistUserMutation.data) {
      getWaitlistQuery.refetch();
      setLoading([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    deleteWaitlistUserMutation.error,
    deleteWaitlistUserMutation.isPending,
    deleteWaitlistUserMutation.data,
  ]);

  const deleteWaitlistUser = (email: string) => {
    deleteWaitlistUserMutation.mutate(email);
    setLoading((prev) => [...prev, { id: email, loading: true }]);
  };

  return (
    <FlexColStart className="w-full h-full">
      <FlexColStart className="w-full px-8 py-4">
        <h1 className="text-white-100 font-ppSB">Waitlist</h1>
        <p className="text-white-300 text-xs font-ppReg">
          View and manage waitlist
        </p>
      </FlexColStart>
      <br />
      {getWaitlistQuery.isPending ? (
        <FlexRowCenter className="w-full">
          <Spinner size={15} color={theme === "dark" ? "#fff" : "#000"} />
        </FlexRowCenter>
      ) : !getWaitlistQuery.isPending && waitlist.length === 0 ? (
        <FlexRowCenter className="w-full">
          <p className="text-white-300 font-ppReg text-sm">No waitlist</p>
        </FlexRowCenter>
      ) : (
        <FlexColStart className="w-full px-8 py-4">
          <FlexRowEnd className="w-full">
            <Button className="bg-blue-101 py-0 h-[30px] scale-[.95]">
              <span className="text-white-100 font-ppReg text-xs">Export</span>
            </Button>
          </FlexRowEnd>
          <br />
          <Table>
            <TableCaption>
              <p className="text-white-300 text-xs font-ppReg">
                Showing {waitlist.length} waitlist users
              </p>
            </TableCaption>
            <TableHeader>
              <TableRow className="dark:hover:bg-dark-102 font-ppSB border-b-white-300/20 ">
                <TableHead className="w-[250px] text-white-300">
                  Emails
                </TableHead>
                <TableHead className="text-left text-white-300">Date</TableHead>
                <TableHead className="text-right text-white-300">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {waitlist.map((w, i) => (
                <TableRow
                  key={i}
                  className="dark:hover:bg-transparent odd:bg-dark-100 even:bg-white-400/40"
                >
                  <TableCell className="font-ppReg">
                    <span className="text-white-100 text-xs">{w.email}</span>
                  </TableCell>
                  <TableCell className="font-ppReg">
                    <span className="text-white-100 text-xs">
                      {dayjs(w.date).fromNow()}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <FlexRowEnd>
                      <Button
                        intent={"error"}
                        className="bg-red-305 py-0 h-[30px] scale-[.80]"
                        onClick={() => deleteWaitlistUser(w.email)}
                        disabled={loading.some((l) => l.id === w.email)}
                      >
                        <span className="text-white-100 font-ppReg text-xs">
                          Delete
                        </span>
                      </Button>
                    </FlexRowEnd>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </FlexColStart>
      )}
    </FlexColStart>
  );
}

// Only show this page to user having the admin role
export default OnlyAdminHOF(WaitlistMainPage);
