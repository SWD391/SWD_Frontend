import React, { useEffect } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Input,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Badge,
  Button,
} from "@nextui-org/react";
import { Logo } from "./Logo";
import { SearchIcon } from "./SearchIcon";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { setUser } from "@/redux/slices/auth.slice";
import { useRouter } from "next/navigation";
import { NotificationIcon } from "./NotificationIcon";
import { BellIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { setNotifications } from "@/redux/slices/signalR.slice";
import { AccountRole } from "../admin/manager/feedbacks/[id]/_components/EmployeeTable";

export default function NavBar() {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();

  const notifications = useSelector(
    (state: RootState) => state.signalR.notifications
  );

  const renderViewed = () => {
    return (
      notifications.length -
      notifications.filter((predicate) => predicate.isView).length
    );
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    console.log(accessToken);
    if (accessToken == null) return;
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    axios
      .get("http://26.78.227.119:5065/api/Notification/GetNotifications", {
        headers,
      })
      .then((response) => dispatch(setNotifications(response.data)))
      .catch((error) => console.log(error));
  }, []);

  const _renderNotis = () => {
    const items: JSX.Element[] = [];

    for (const noti of notifications) {
      items.push(
        <DropdownItem key={noti.notificationId}>
          {" "}
          <Link
            color="foreground"
            onClick={() => {
              const accessToken = localStorage.getItem("accessToken");
              console.log(accessToken);
              if (accessToken == null) return;
              const headers = {
                Authorization: `Bearer ${accessToken}`,
              };

              axios
                .post(
                  `http://26.78.227.119:5065/api/Notification/SetNotificationViewed?notiId=${noti.notificationId}`,
                  {},
                  { headers }
                )
                .then((response) => dispatch(setNotifications(response.data)))
                .catch((error) => console.log(error));
            }}
            href={noti.resourceUrl}
            className={!noti.isView ? "text-red-500" : undefined}
          >
            {" "}
            {noti.message}{" "}
          </Link>
        </DropdownItem>
      );
    }
    items.push(
      <DropdownItem
        className="text-center"
        onClick={() => {
          const accessToken = localStorage.getItem("accessToken");
          console.log(accessToken);
          if (accessToken == null) return;
          const headers = {
            Authorization: `Bearer ${accessToken}`,
          };

          axios
            .post(
              "http://26.78.227.119:5065/api/Notification/SetAllNotificationsViewed",
              {},
              { headers }
            )
            .then((response) => dispatch(setNotifications(response.data)))
            .catch((error) => console.log(error));
        }}
      >
        {" "}
        <span className="font-bold"> Mark As Readed </span>{" "}
      </DropdownItem>
    );
    return items;
  };

  const postfix = () => {
    switch (user?.role) {
      case 2:
        return "staff";
      case 3:
        return "manager";
      case 0:
      case 1:
      default:
        return "";
    }
  };
  return (
    <Navbar isBordered>
      <NavbarContent justify="start">
        <NavbarBrand className="mr-4">
          <Logo />
          <p className="hidden sm:block font-bold text-inherit">Facifix</p>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-6">
          <NavbarItem isActive>
            <Link
              href="#"
              aria-current="page"
              color="secondary"
              onClick={() => router.push("/assets")}
            >
              Assets
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link
              color="foreground"
              onClick={() => router.push("/user/feedbacks/create")}
            >
              Create Feedback
            </Link>
          </NavbarItem>

          {postfix() != "" ? (
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Link color="foreground" className="whitespace-nowrap">
                  Admin Dashboard
                </Link>
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem
                  key="profile"
                  onClick={() => router.push(`/admin/users`)}
                >
                  Manage Users
                </DropdownItem>
                <DropdownItem
                  key="feedbacks"
                  onClick={() => router.push(`/admin/${postfix()}/feedbacks`)}
                >
                  Manage Feedbacks
                </DropdownItem>
                <DropdownItem
                  key="feedbacks"
                  onClick={() => router.push(`/admin/${postfix()}/tasks`)}
                >
                  Manage Tasks
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : null}
        </NavbarContent>
      </NavbarContent>

      <NavbarContent as="div" className="items-center" justify="end">
        <Badge color="danger" content={renderViewed()} shape="circle">
          <Dropdown>
            <DropdownTrigger>
              <Button
                radius="full"
                isIconOnly
                aria-label="more than 99 notifications"
                variant="light"
              >
                <BellIcon className="w-6 h-6" />
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              {_renderNotis()}
            </DropdownMenu>
          </Dropdown>
        </Badge>

        {user != null ? (
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                name={user.firstName}
                size="sm"
                src={user.imageUrl}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem
                key="profile"
                onClick={() => router.push("/user/profile")}
              >
                My Profile
              </DropdownItem>
              <DropdownItem
                key="feedbacks"
                onClick={() => router.push("/user/feedbacks")}
              >
                Feedbacks
              </DropdownItem>
              <DropdownItem
                key="feedbacks"
                onClick={() => router.push("/user/tasks")}
              >
                Tasks
              </DropdownItem>
              <DropdownItem
                key="logout"
                onClick={() => {
                  dispatch(setUser(null))
                  localStorage.removeItem("accessToken")
                }}
                color="danger"
              >
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          <Dropdown>
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                size="sm"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="signin" onClick={() => router.push("/auth/sign-in")}>Sign In</DropdownItem>
              <DropdownItem key="signup" onClick={() => router.push("/auth/sign-up")}>Sign Up</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        )}
      </NavbarContent>
    </Navbar>
  );
}
