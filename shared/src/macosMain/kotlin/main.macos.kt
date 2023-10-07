import androidx.compose.ui.window.Window
import platform.AppKit.NSApp
import platform.AppKit.NSApplication
import ui.App

fun main() {
    NSApplication.sharedApplication()
    Window("App") {
        App()
    }
    NSApp?.run()
}
