<?php

namespace App\Mail;

use App\Models\Lead;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class NewLeadNotification extends Mailable
{
    use Queueable, SerializesModels;

    private const SOURCE_LABELS = [
        'contact_simple' => 'Contact page',
        'contact_full' => 'Contact page',
        'enquiry_modal' => 'Walkthrough enquiry',
    ];

    public function __construct(public Lead $lead)
    {
        //
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: "New enquiry from {$this->lead->name}",
            replyTo: [$this->lead->email],
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.lead-notification',
            with: [
                'sourceLabel' => self::SOURCE_LABELS[$this->lead->source] ?? $this->lead->source,
                'adminUrl' => rtrim(config('app.frontend_url'), '/').'/admin/leads',
            ],
        );
    }
}
