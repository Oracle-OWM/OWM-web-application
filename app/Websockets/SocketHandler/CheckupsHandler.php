<?php

namespace App\Websockets\SocketHandler;

use Ratchet\ConnectionInterface;
use Ratchet\RFC6455\Messaging\MessageInterface;
use Ratchet\WebSocket\MessageComponentInterface;

class CheckupsHandler extends BaseSocketHandler implements MessageComponentInterface
{


    function onMessage(ConnectionInterface $from, MessageInterface $msg)
    {
        // TODO: Implement onMessage() method.
        broadcast(new \App\Events\NewMessage('Hello Websockets'));

    }

}
