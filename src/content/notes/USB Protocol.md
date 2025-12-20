---
created: 2025-06-23T00:00:00.000Z
modified: 2025-09-19T00:00:00.000Z
tags:
  - notes
  - electronics
title: USB Protocol
description: Notes on USB!
date: 2025-06-23T00:00:00.000Z
permalink: usb-protocol/
layout: post.njk
thumbnail: /content/attachments/usb.png
---
Notes on USB!
# USB Protocol

![usb.png](/content/attachments/usb.png)

# USB ?
At work, I wrote a USB host-side driver and client-facing library from scratch. This also included implementing host-side support for the CDC device class. All on a custom RTOS on a new SoC.

Armed with only some reference code from the chip vendor and the USB spec, it was pretty tough!
## High level overview of USB terminology

All USB topologies (a bunch of connected USB devices) consist of **one host** (typically your computer) and **one or more devices** (things you plug into your computer).
* There can only be one host on a USB topology. This is important!!

USB is a host-initiated protocol, meaning the host will start all transactions on the bus (the 4 physical wires that make up USB).
* So the host first sends some data over the wires, then devices will send some data "back" over the wires, and so forth.
* With this agreement, the host always knows what device it is talking to and devices always know when to send their data/perform their action
* The bulk of the USB spec deals with the protocol of *how* the data over the 4 wires is formatted and ordered

A physical USB device might actually be made up of several logical USB devices (ex. a usb hub with an SD card reader). Depending on the physical device, this could be implemented in two ways:
* As a *compound USB device*. To the host, the device looks like two different USB device: a USB hub and a something that is always plugged in to the USB hub
* As a *composite USB device*. To the host, the device looks like one USB device. However, the USB device allows itself to be controlled in multiple ways.

Each "function" of a USB device is known a *USB function*. All non-composite devices has one USB function, while composite devices have multiple USB functions. You might see "device" and "function" be used interchangeably, but there is a difference!

# Details
> [!warning] Draft
> I intend to give a full overview of how to implement USB. But I'm still missing some details below.

Both conveniently and confusingly, the USB protocol is implemented by both the hardware controller the physical USB bus lives on and the software that manipulates (drives) that hardware.

I will be focusing on USB 2.0. USB is built to be backwards compatible with earlier versions of the spec, so knowing USB 2.0 is probably good enough for most applications that interact with USB.

I recommend reading the first few sections of these docs to get familiar with the terminology and basics of the USB protocol.
1. [USB in a NutShell - BeyondLogic](https://www.beyondlogic.org/usbnutshell/usb1.shtml) (one of the best resources. I kept coming back to this to reference its diagrams and tables)
2. [USB 101 - Cypress](https://www.infineon.com/assets/row/public/documents/cross-divisions/42/infineon-an57294-usb-101-an-introduction-to-universal-serial-bus-2.0-applicationnotes-en.pdf?fileId=8ac78c8c7cdc391c017d072d8e8e5256) (decent mix of overview and technical details. includes some implementation guidance)
3. [USB 2.0 Specification](https://www.usb.org/document-library/usb-20-specification) (this is the official specification!)

Watching these videos also helped me establish a baseline understanding of USB
1. [How does a USB keyboard work? - Ben Eater](https://www.youtube.com/watch?v=wdgULBpRoXk)
2. [How does USB device discovery work? - Ben Eater](https://www.youtube.com/watch?v=N0O5Uwc3C0o)

# Physical
USB has four wires
Data goes over D+ and D- lines as a differential pair
Data over the lines are NRZI encoded
# Core
All sets of messages (transactions) on the USB bus are initiated by the host
Data is sent along fixed time intervals called *frames*. The time interval for a frame depends on what speed the USB bus is configured at (low-speed, full-speed, high-speed, ...)
# Packets
Every *frame* contains a series of *packets*
Every packet starts with a sync field and end with an end-of-packet (EOP) field. This delineates where a packet starts and stops on the bus.
Every packet contain a packet id (PID) field that states the type of packet being sent
# Transactions
A *transaction* is made up of a series of packets. Every transaction consists of a token packet, an optional data packet, and an optional handshake packet.
A *function* is a USB device that adds any peripheral feature to a host (keyboard, audio output, ...)
Functions are made up of *endpoints*. Packets are sent to/from endpoints. An endpoint is either a source or a sink for packets.
A *pipe* is a logical connection between the host and a function's endpoint. Only one type and of transfer can occur on a given pipe.
# Transfers
Transfers are pre-defined transactions (series-of-packets) that occur between the host and an endpoint. All packets sent over USB will fit into a transfer type, and every endpoint on a USB function only supports one transfer type at a time.
## Control Transfer
Setup stage transaction
Data stage transaction
Status stage transaction
## Bulk Transfer
Host sends an out transaction with data
Host sends an in transaction and waits for data
## Interrupt Transfer
Host sends an IN transaction at an endpoint-specified interval (interval expressed in frames). Device responds when it has data. This is the device sending an "interrupt".
Host sends an OUT transaction at no greater than the endpoint-specified interval. Device accepts data when it is ready. This is the host sending an "interrupt" to the device.
## Isochronous Transfer
Host sends or receives data at an endpoint-specific interval. There is no handshake packet in this transaction.
# Standard Request
Standard requests are specially-defined control transfer with set request and response payloads that each USB function must support. The purpose of standard requests are to establish a known baseline for the USB host to communicate with and learn the configuration of connected USB functions
## Standard USB descriptors
These descriptors define the response format to standard "get descriptor"-type requests
Device descriptor
Configuration descriptor
Interface descriptor
Endpoint descriptor
String descriptor
# Device Classes
Finally, usage of the USB protocol is grouped together into common use cases known as *device classes*. This defines standard ways common peripherals (keyboards, audio in/out, printers, virtual serial ports, ...) will use the USB protocol to communicate with the host. By defining these classes, the host can now implement common software (*device drivers*) to communicate with these peripherals.
# Implementation
Using the above tools, the USB protocol can now be used to implement a USB host or a USB device.  This includes:
* Bus enumeration
* Hub device class
* Other device classes (HID, CDC, Audio)

The USB hardware controller will generally:
* Take care of framing packets
* Bandwidth management
* Expose buffers where data is written to or read from
* Possibly provides some features to automate certain transfer (automatic polling for interrupt transfers, automatic notification for isochronous transfers, etc)

The USB software controller (driving and sitting above the hardware) will generally:
* Decide what packets to send
* Decide where a packet should be sent
* Decide the order packets get sent in
* Decide the data that goes in the packets
* Reads and writes to the hardware controller's buffers
