<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>@yield('subject', 'Design By Chris')</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f1ea;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f1ea;">
  <tr>
    <td align="center" style="padding:40px 16px;">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px; width:100%; background-color:#ffffff; border-radius:24px; overflow:hidden; border:1px solid #ecdfc3;">

        <tr>
          <td style="background-color:#15110a; padding:36px 32px; text-align:center;">
            <img src="{{ $message->embed(resource_path('mail-assets/logo-wordmark.png')) }}" width="220" alt="Design By Chris" style="display:block; margin:0 auto; max-width:220px; width:220px; height:auto; border:0;">
          </td>
        </tr>

        <tr>
          <td style="padding:40px 40px 8px 40px; font-family: Georgia, 'Times New Roman', serif; color:#3a3222;">
            @yield('content')
          </td>
        </tr>

        <tr>
          <td style="padding:28px 40px 36px 40px;">
            <div style="border-top:1px solid #f0e9d8; padding-top:20px; text-align:center;">
              <p style="margin:0 0 6px 0; font-family: Georgia, 'Times New Roman', serif; font-size:13px; color:#9a8d72;">
                Design By Chris &middot; 55 East Birchwood Ave, Brooklyn, New York 11201
              </p>
              <p style="margin:0; font-family: Georgia, 'Times New Roman', serif; font-size:13px; color:#9a8d72;">
                <a href="mailto:{{ config('mail.from.address') }}" style="color:#b9852b; text-decoration:none;">{{ config('mail.from.address') }}</a>
              </p>
            </div>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>
</body>
</html>
