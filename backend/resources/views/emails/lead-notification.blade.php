@extends('emails.layout')

@section('subject', "New enquiry from {$lead->name}")

@section('content')
<p style="margin:0 0 4px 0; font-size:13px; font-weight:700; letter-spacing:0.08em; text-transform:uppercase; color:#b9852b;">
  New Enquiry
</p>
<p style="margin:0 0 24px 0; font-size:22px; line-height:1.4; font-weight:700; color:#221b10;">
  {{ $lead->name }} just reached out.
</p>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8f5ee; border-radius:18px; margin:0 0 24px 0;">
  <tr>
    <td style="padding:24px 28px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td style="padding:6px 0; font-size:14px; color:#9a8d72; width:120px; vertical-align:top;">Email</td>
          <td style="padding:6px 0; font-size:15px; color:#221b10;">
            <a href="mailto:{{ $lead->email }}" style="color:#b9852b; text-decoration:none;">{{ $lead->email }}</a>
          </td>
        </tr>
        @if ($lead->phone)
        <tr>
          <td style="padding:6px 0; font-size:14px; color:#9a8d72; vertical-align:top;">Phone</td>
          <td style="padding:6px 0; font-size:15px; color:#221b10;">{{ $lead->phone }}</td>
        </tr>
        @endif
        @if ($lead->project_type)
        <tr>
          <td style="padding:6px 0; font-size:14px; color:#9a8d72; vertical-align:top;">Project Type</td>
          <td style="padding:6px 0; font-size:15px; color:#221b10;">{{ $lead->project_type }}</td>
        </tr>
        @endif
        @if ($lead->subject)
        <tr>
          <td style="padding:6px 0; font-size:14px; color:#9a8d72; vertical-align:top;">Subject</td>
          <td style="padding:6px 0; font-size:15px; color:#221b10;">{{ $lead->subject }}</td>
        </tr>
        @endif
        <tr>
          <td style="padding:6px 0; font-size:14px; color:#9a8d72; vertical-align:top;">Source</td>
          <td style="padding:6px 0; font-size:15px; color:#221b10;">{{ $sourceLabel }}</td>
        </tr>
        @if ($lead->page_path)
        <tr>
          <td style="padding:6px 0; font-size:14px; color:#9a8d72; vertical-align:top;">Page</td>
          <td style="padding:6px 0; font-size:15px; color:#221b10;">{{ $lead->page_path }}</td>
        </tr>
        @endif
      </table>
    </td>
  </tr>
</table>

@if ($lead->message)
<p style="margin:0 0 8px 0; font-size:13px; font-weight:700; letter-spacing:0.06em; text-transform:uppercase; color:#9a8d72;">
  Message
</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 28px 0;">
  <tr>
    <td style="padding:16px 20px; border-left:3px solid #b9852b; font-size:15px; line-height:1.7; color:#5b5343;">
      {{ $lead->message }}
    </td>
  </tr>
</table>
@endif

<table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 8px 0;">
  <tr>
    <td style="border-radius:16px; background-color:#b9852b;">
      <a href="{{ $adminUrl }}"
         style="display:inline-block; padding:14px 28px; font-family: Georgia, 'Times New Roman', serif; font-size:15px; font-weight:700; color:#ffffff; text-decoration:none; border-radius:16px;">
        View in Admin Panel
      </a>
    </td>
  </tr>
</table>

<p style="margin:16px 0 0 0; font-size:13px; line-height:1.6; color:#9a8d72;">
  Reply-to is already set to {{ $lead->name }}'s email — just hit reply to respond directly.
</p>
@endsection
