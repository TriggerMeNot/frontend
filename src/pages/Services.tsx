import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import {
  getServiceGithubAuth,
  sendServiceGithubAuth,
  getServiceGoogleAuth,
  sendServiceGoogleAuth,
  getServiceDiscordAuth,
  sendServiceDiscordAuth,
  getServiceMicrosoftAuth,
  sendServiceMicrosoftAuth,
} from "@/utils/api";
import { useAuth } from "@/contexts/AuthProvider";

function Services() {
  const { backendAddress, token } = useAuth();
  const [githubStatus, setGithubStatus] = useState<{ authorized: boolean } | undefined>(undefined);

  const [googleStatus, setGoogleStatus] = useState<{ authorized: boolean } | undefined>(undefined);
  const [discordStatus, setDiscordStatus] = useState<{ authorized: boolean } | undefined>(undefined);
  const [microsoftStatus, setMicrosoftStatus] = useState<{ authorized: boolean } | undefined>(undefined);

  useEffect(() => {
    const fetchStatus = async () => {
      setGithubStatus(await getServiceGithubAuth(backendAddress, token as string));
      setGoogleStatus(await getServiceGoogleAuth(backendAddress, token as string));
      setDiscordStatus(await getServiceDiscordAuth(backendAddress, token as string));
      setMicrosoftStatus(await getServiceMicrosoftAuth(backendAddress, token as string));
    };

    fetchStatus();
  }, []);

  useEffect(() => {
    const fn = async () => {

      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");

      if (code) {
        const data = await sendServiceGithubAuth(backendAddress, token as string, code);
        setGithubStatus(data);
        window.history.replaceState({}, document.title, "/services");
      }
    }

    window.addEventListener("load", fn);

    return () => {
      window.removeEventListener("load", fn);
    }
  }, []);

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>
            Github
          </CardTitle>
          <CardDescription>
            Github is a web-based platform used for version control. It is used to store and manage code for software projects.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {githubStatus?.authorized ? (
            <Button onClick={() => window.open(`https://github.com/apps/${import.meta.env.VITE_GITHUB_APP_NAME as string}/installations/new`)} className="w-full" variant={"secondary"}>
              Edit Github Authorization
            </Button>
          ) : (
            <Button onClick={() => window.location.assign(`https://github.com/apps/${import.meta.env.VITE_GITHUB_APP_NAME as string}/installations/new`)} className="w-full">
              Authorize with Github
            </Button>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>
            Google
          </CardTitle>
          <CardDescription>
            Google is a multinational technology company that specializes in Internet-related services and products.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {googleStatus?.authorized ? (
            <Button onClick={() => window.open(`https://myaccount.google.com/permissions`)} className="w-full" variant={"secondary"}>
              Edit Google Authorization
            </Button>
          ) : (
            <Button onClick={() => window.location.assign(`https://accounts.google.com/o/oauth2/auth?client_id=${import.meta.env.VITE_GOOGLE_CLIENT_ID as string}&redirect_uri=${import.meta.env.VITE_GOOGLE_REDIRECT_URI as string}&scope=https://www.googleapis.com/auth/userinfo.email&response_type=code`)} className="w-full">
              Authorize with Google
            </Button>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>
            Discord
          </CardTitle>
          <CardDescription>
            Discord is a voice, video and text communication service to talk and hang out with your friends and communities.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {discordStatus?.authorized ? (
            <Button className="w-full" onClick={() => window.open(`https://discord.com/developers/applications/${import.meta.env.VITE_DISCORD_CLIENT_ID as string}/bot`)}>
              Edit Discord Authorization
            </Button>
          ) : (
            <Button className="w-full" onClick={() => window.location.assign(`https://discord.com/api/oauth2/authorize?client_id=${import.meta.env.VITE_DISCORD_CLIENT_ID as string}&redirect_uri=${import.meta.env.VITE_DISCORD_REDIRECT_URI as string}&response_type=code&scope=bot`)}>
              Authorize with Discord
            </Button>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>
            Microsoft
          </CardTitle>
          <CardDescription>
            Microsoft is an American multinational technology company that produces computer software, consumer electronics, personal computers, and related services.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {microsoftStatus?.authorized ? (
            <Button className="w-full" onClick={() => window.open(`https://account.live.com/consent/Manage`)}>
              Edit Microsoft Authorization
            </Button>
          ) : (
            <Button className="w-full" onClick={() => window.location.assign(`https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=${import.meta.env.VITE_MICROSOFT_CLIENT_ID as string}&response_type=code&redirect_uri=${import.meta.env.VITE_MICROSOFT_REDIRECT_URI as string}&scope=https://graph.microsoft.com/User.Read`)}>
              Authorize with Microsoft
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default Services;
