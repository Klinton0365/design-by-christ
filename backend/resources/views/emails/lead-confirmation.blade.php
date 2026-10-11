@extends('emails.layout')

@section('subject', "We've received your message, {$firstName}")

@section('content')
<p style="margin:0 0 20px 0; font-size:22px; line-height:1.4; font-weight:700; color:#221b10;">
  Hi {{ $firstName }},
</p>

<p style="margin:0 0 20px 0; font-size:16px; line-height:1.7; color:#5b5343;">
  Thank you for reaching out to <strong style="color:#221b10;">Design By Chris</strong>. Your message has
  landed safely with our team, and a designer will personally follow up with you
  <strong style="color:#221b10;">within 24 hours</strong>.
</p>

<p style="margin:0 0 28px 0; font-size:16px; line-height:1.7; color:#5b5343;">
  In the meantime, we'd love for you to get a feel for the kind of spaces we create.
</p>

<table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 32px 0;">
  <tr>
    <td style="border-radius:16px; background-color:#b9852b;">
      <a href="{{ $frontendUrl }}/project"
         style="display:inline-block; padding:14px 28px; font-family: Georgia, 'Times New Roman', serif; font-size:15px; font-weight:700; color:#ffffff; text-decoration:none; border-radius:16px;">
        Explore Our Portfolio
      </a>
    </td>
  </tr>
</table>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8f5ee; border-radius:18px; margin:0 0 28px 0;">
  <tr>
    <td style="padding:24px 28px;">
      <p style="margin:0 0 10px 0; font-size:15px; line-height:1.7; font-style:italic; color:#5b5343;">
        &ldquo;From the cabinetry down to the lighting fixtures, every piece of furnishing was chosen with
        real intention. Our kitchen finally feels like the heart of the home.&rdquo;
      </p>
      <p style="margin:0; font-size:13px; font-weight:700; letter-spacing:0.04em; text-transform:uppercase; color:#b9852b;">
        Nattasha Mith &middot; Sydney, USA
      </p>
    </td>
  </tr>
</table>

<p style="margin:0 0 4px 0; font-size:16px; line-height:1.7; color:#5b5343;">
  Talk soon,
</p>
<p style="margin:0; font-size:16px; line-height:1.7; font-weight:700; color:#221b10;">
  The Design By Chris Team
</p>
@endsection
