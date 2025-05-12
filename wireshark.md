---
title: WireShark
category: tools, network
layout: 2017/sheet
updated: 2024-03-03
intro: |
  [Wireshark](https://www.wireshark.org/) is a network analyzer.   
---

### Capuring Modes
| Mode | Description |
|------|-------------|
| Promiscuous Mode | Capture all packets on the network segment |
| Non-Promiscuous Mode | Capture only packets addressed to the interface |

Filtering packets
---------
{: .-three-column}

### Modes
| Mode | Description |
|------|-------------|
| Capture Filter | Used before or during the capture process. |
| Display Filter Syntax | Used after the capture has been completed |

#### Syntax
- `protocol String1 String2 ComparisonOperator value`

#### Example
- `http dest ip == 192.168.1.1 and tcp port`

### Display Filter Syntax
| Operator | Description             | Example                 |
|----------|-------------------------|-------------------------|
| eq or == | Equal                   | `ip.dest == 192.168.1.1`|
| ne or != | Not Equal               | `ip.dest != 192.168.1.1`|
| gt or >  | Greater than            | `frame.len > 10`        |
| lt or <  | Less than               | `frame.len < 10`        |
| ge or >= | Greater than or Equal   | `frame.len >= 10`       |
| le or <= | Less than or Equal      | `frame.len <= 10`       |

### Logical Operators
| Operator | Description                   | Example                          |
|----------|-------------------------------|----------------------------------|
| and or &&| Logical AND                   | `condition1 && condition2`       |
| or or \|\|| Logical OR                   | `condition1 \|\| condition2`     |
| xor or ^^| Logical XOR                   | `condition1 ^^ condition2`       |
| not or ! | NOT (Negation)                | `!condition1`                    |
| [n] [...]| Substring operator            | `frame contains "example text"`  |

## Keyboard Shortcuts

| Accelerator | Description                                    |
|-------------|------------------------------------------------|
| Ctrl + E      | Start/Stop Capturing                           |
| Tab or Shift + Tab | Move between screen elements              |
| Alt + → or Option + → | Move to the next packet in the selection history |
| ↓ | Move to the next packet or detail item                     |
| → | In the packet detail, opens the selected tree item         |
| ↑ | Move to the previous packet or detail item                 |
| Shift + → | In the packet detail, opens all subtrees            |
| Ctrl / ⌘ + ↓ or F8 | Move to the next packet, even if the packet list isn’t focused |
| Ctrl + ↑ or F7 | Move to the previous packet, even if the packet list isn’t focused |
| Ctrl / ⌘ + → | In the packet detail, opens all tree items           |
| Ctrl / ⌘ + ← | In the packet detail, closes all tree items          |
| Ctrl + . | Move to the next packet of the conversation (TCP, UDP or IP) |
| Backspace | In the packet detail, jumps to the parent node    |
| Ctrl + , | Move to the previous packet of the conversation (TCP, UDP or IP) |
| Return or Enter | In the packet detail, toggles the selected tree item |

## Common Filtering Commands

| Filter syntax               | Description                      |
|-----------------------------|----------------------------------|
| `ip.addr == 10.10.50.1`     | Wireshark Filter by IP           |
| `ip.dest == 10.10.50.1`     | Filter by Destination IP         |
| `ip.src == 10.10.50.1`      | Filter by Source                 |
| `ip.addr >= 10.10.50.1 and ip.addr <= 10.10.50.100` | Filter by IP range |
| `!(ip.addr == 10.10.50.1)` | Filter out/ Exclude IP address |
| `ip.addr == 10.10.50.1/24` | Filter IP subnet |
| `ip.addr == 10.10.50.1/24 and ip.addr == 10.10.51.1/24` | Filter by multiple specified IP subnets |
| `tcp.port == 25` | Filter by port (TCP) |
| `tcp.dstport == 23` | Filter by destination port (TCP) |
| `ip.addr == 10.10.50.1 and Tcp.port == 25` | Filter by ip address and port |
| `http.host == "host name"` | Filter by URL |
| `frame.time >= "June 02, 2019 18:04:00"` | Filter by time stamp |
| `tcp.flags.syn == 1` | Filter SYN flag |
| `tcp.flags.syn == 1 and tcp.flags.ack == 0` | - |
| `wlan.fc.type_subtype = 0x08` | Wireshark Beacon Filter |
| `eth.dst == ff:ff:ff:ff:ff:ff` | Wireshark broadcast filter |
| `(eth.dst[0] & 1)` | WiresharkMulticast filter |
| `ip.host = hostname` | Host name filter |
| `eth.addr == 00:70:f4:23:18:c4` | MAC address filter |
| `tcp.flags.reset == 1` | RST flag filter |

---

Also see
--------

- [Wireshark User's Guide](https://www.wireshark.org/docs/wsug_html_chunked/) _(wireshark.org)_
- [Wireshark CheatSheet](https://www.comparitech.com/net-admin/wireshark-cheat-sheet/) _(comparitech.com)_