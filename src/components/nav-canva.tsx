import * as React from "react";
import { useDnD } from "@/contexts/DnDContext";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ChevronRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthProvider";
import { Icons } from "./ui/icons";

export function NavCanva({
  ...props
}: React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  const [_, setData] = useDnD();
  const { services } = useAuth();

  const onDragStart = (item: { id: number; name: string; description?: string; }, type: string) => (event: React.DragEvent) => {
    const serviceName = services.find((service) => service.actions.some((action) => action.id === item.id) || service.reactions.some((reaction) => reaction.id === item.id))?.name || "";
    setData({
      payload: {
        id: item.id,
        name: item.name,
        type: `${type}:${item.id}`,
        data: {
          description: item.description,
          icon: React.createElement(Icons[serviceName.toLowerCase() as keyof typeof Icons] || Icons["default"]),
          serviceName: serviceName,
          ...(type === "action" ? {
            ...services.find((service) => service.actions.some((a) => a.id === item.id))?.actions.find((a) => a.id === item.id),
          } : (type === "reaction" ? {
            ...(services.find((service) => service.reactions.some((r) => r.id === item.id))?.reactions.find((r) => r.id === item.id) || {}),
          } : {})),
        },
      },
      type: `${type}:${item.id}`,
    });
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <SidebarGroup {...props}>
      <SidebarGroupLabel className="mb-2.5">
        Action Reaction Nodes
      </SidebarGroupLabel>
      <SidebarMenu className="space-y-2">
        {services.map((service) => (
          <Collapsible key={service.name}>
            <SidebarMenuItem>
              <SidebarMenuButton>
                {React.createElement(Icons[service.name.toLowerCase() as keyof typeof Icons] || Icons["default"])}
                {service.name}
              </SidebarMenuButton>
              <CollapsibleTrigger asChild>
                <SidebarMenuAction className="data-[state=open]:rotate-90">
                  <ChevronRight />
                  <span className="sr-only">Toggle</span>
                </SidebarMenuAction>
              </CollapsibleTrigger>
            </SidebarMenuItem>
            <CollapsibleContent>
              <SidebarMenuSub>
                {service.actions.map((action) => (
                  <SidebarMenuSubItem key={action.id}>
                    <SidebarMenuSubButton>
                      <Sheet>
                        <SheetTrigger asChild>
                          <button
                            onDragStart={onDragStart(action, "action")}
                            draggable
                            className="flex items-center space-x-2 w-full"
                          >
                            {action.name}
                          </button>
                        </SheetTrigger>
                        <SheetContent>
                          <SheetHeader>
                            <SheetTitle>{action.name}</SheetTitle>
                            <SheetDescription>{action.description}</SheetDescription>
                          </SheetHeader>
                        </SheetContent>
                      </Sheet>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                ))}

                {service.reactions.map((reaction) => (
                  <SidebarMenuSubItem key={reaction.id}>
                    <SidebarMenuSubButton>
                      <Sheet>
                        <SheetTrigger asChild>
                          <button
                            onDragStart={onDragStart(reaction, "reaction")}
                            draggable
                            className="flex items-center space-x-2 w-full"
                          >
                            {reaction.name}
                          </button>
                        </SheetTrigger>
                        <SheetContent>
                          <SheetHeader>
                            <SheetTitle>{reaction.name}</SheetTitle>
                            <SheetDescription>{reaction.description}</SheetDescription>
                          </SheetHeader>
                        </SheetContent>
                      </Sheet>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
