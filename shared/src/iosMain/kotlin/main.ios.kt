import androidx.compose.ui.window.ComposeUIViewController
import platform.UIKit.UIViewController
import ui.chat.Action
import ui.chat.ChatApp
import ui.chat.Message
import ui.chat.myUser
import ui.chat.store

fun ChatViewController(): UIViewController = ComposeUIViewController {
    ChatApp(displayTextField = false)
}

fun sendMessage(text: String) {
    store.send(Action.SendMessage(Message(myUser, timestampMs(), text)))
}

fun gradient3Colors() = ChatColors.GRADIENT_3

fun surfaceColor() = ChatColors.SURFACE
