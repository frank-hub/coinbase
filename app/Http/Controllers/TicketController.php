<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
class TicketController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('dashboard/ticket_form');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = Auth::user();

        $request->validate([
            'priority' => 'required|string',
            'subject' => 'required|string|max:255',
            'message' => 'required|string',
        ]);

        Ticket::create([
            'user_id' => $user->id,
            'priority' => $request->priority,
            'subject' => $request->subject,
            'message' => $request->message,
        ]);

        return redirect()->route('submit_ticket')->with('success', 'Ticket submitted successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Ticket $ticket)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Ticket $ticket)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Ticket $ticket)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Ticket $ticket)
    {
        //
    }
}
