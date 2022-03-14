const oauthCard = {
    actions: [
        {
            type: "Action.Execute",
            title: "Allow",
            verb: "oauth-signin",
        },
        {
            type: "Action.Execute",
            title: "Deny",
            verb: "oauth-logout",
        },
    ],
    body: [
        {
            text: "Fetch User Details Request",
            type: "TextBlock",
            isSubtle: false,
            wrap: true,
            weight: "Bolder",
        },
        {
            text: "Requestor: Ashwin V C",
            type: "TextBlock",
            isSubtle: false,
            wrap: true,
        },
        {
            text: "Request ID: 9027",
            type: "TextBlock",
            isSubtle: false,
            wrap: true,
        },
    ],
    type: "AdaptiveCard",
    version: "1.2",
};

const ssoCard = {
    actions: [
        {
            type: "Action.Execute",
            title: "Allow",
            verb: "sso-signin",
        },
        {
            type: "Action.Execute",
            title: "Deny",
            verb: "sso-logout",
        },
    ],
    body: [
        {
            text: "Fetch User Details Request",
            type: "TextBlock",
            isSubtle: false,
            wrap: true,
            weight: "Bolder",
        },
        {
            text: "Requestor: Ashwin V C",
            type: "TextBlock",
            isSubtle: false,
            wrap: true,
        },
        {
            text: "Request ID: 9027",
            type: "TextBlock",
            isSubtle: false,
            wrap: true,
        },
    ],
    type: "AdaptiveCard",
    version: "1.2",
};

const oauthLoginCard = {
    actions: [
        {
            type: "Action.Execute",
            title: "Close",
            verb: "oauth-logout",
        },
    ],
    body: [
        {
            text: "Login Success, Welcome!",
            type: "TextBlock",
            isSubtle: false,
            wrap: true,
            weight: "Bolder",
            size: "Large",
        },
        {
            type: "ColumnSet",
            columns: [
                {
                    type: "Column",
                    items: [
                        {
                            type: "Image",
                            style: "Person",
                            url: "https://pbs.twimg.com/profile_images/1352569794701086720/AJINsOC7_400x400.jpg",
                            size: "Medium",
                        },
                    ],
                    width: "auto",
                },
                {
                    type: "Column",
                    items: [
                        {
                            type: "TextBlock",
                            weight: "Bolder",
                            text: "Ashwin V C",
                            wrap: true,
                        },
                        {
                            type: "TextBlock",
                            spacing: "None",
                            text: "EmployeeId: 123456",
                            isSubtle: true,
                            wrap: true,
                        },
                        {
                            type: "TextBlock",
                            spacing: "None",
                            text: "Sohini Campus",
                            isSubtle: true,
                            wrap: true,
                        },
                    ],
                    width: "stretch",
                },
            ],
        },
    ],
    type: "AdaptiveCard",
    version: "1.2",
};

const ssoLoginCard = {
    actions: [
        {
            type: "Action.Execute",
            title: "Close",
            verb: "sso-logout",
        },
    ],
    body: [
        {
            text: "Login Success, Welcome!",
            type: "TextBlock",
            isSubtle: false,
            wrap: true,
            weight: "Bolder",
            size: "Large",
        },
        {
            type: "ColumnSet",
            columns: [
                {
                    type: "Column",
                    items: [
                        {
                            type: "Image",
                            style: "Person",
                            url: "https://pbs.twimg.com/profile_images/1352569794701086720/AJINsOC7_400x400.jpg",
                            size: "Medium",
                        },
                    ],
                    width: "auto",
                },
                {
                    type: "Column",
                    items: [
                        {
                            type: "TextBlock",
                            weight: "Bolder",
                            text: "Ashwin V C",
                            wrap: true,
                        },
                        {
                            type: "TextBlock",
                            spacing: "None",
                            text: "EmployeeId: 123456",
                            isSubtle: true,
                            wrap: true,
                        },
                        {
                            type: "TextBlock",
                            spacing: "None",
                            text: "Sohini Campus",
                            isSubtle: true,
                            wrap: true,
                        },
                    ],
                    width: "stretch",
                },
            ],
        },
    ],
    type: "AdaptiveCard",
    version: "1.2",
};

module.exports = { oauthCard, ssoCard, oauthLoginCard, ssoLoginCard };
