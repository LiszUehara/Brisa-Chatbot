package ui.home

import androidx.compose.runtime.Composable
import cafe.adriel.voyager.core.screen.Screen
import cafe.adriel.voyager.core.screen.ScreenKey
import dev.icerock.moko.mvvm.compose.getViewModel
import dev.icerock.moko.mvvm.compose.viewModelFactory
import ui.chat.ChatApp
import ui.chat.Store
import view.MainViewModel

class ChatScreen() : Screen{
    override val key: ScreenKey = "Chatbot Serafin"
    @Composable
    override fun Content() {
        ChatApp()
    }
}