package ui.home

import androidx.compose.foundation.layout.WindowInsetsSides
import androidx.compose.material.MaterialTheme
import androidx.compose.material.Scaffold
import androidx.compose.material.rememberScaffoldState
import androidx.compose.runtime.Composable
import androidx.compose.runtime.SideEffect
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.ui.platform.TextToolbarStatus
import cafe.adriel.voyager.core.screen.Screen
import cafe.adriel.voyager.navigator.Navigator
import cafe.adriel.voyager.transitions.SlideTransition
import ui.TopBar
import ui.chat.Store
import ui.drawerUtils.DrawerContent

class HomeScreen (): Screen {

    @Composable
    override fun Content() {
        val state = rememberScaffoldState()
        val scope = rememberCoroutineScope()


        MaterialTheme(
        ){
            SideEffect {
            }
            Navigator(
                screen = ItemsScreen
            ){navigator ->

                Scaffold(

                    scaffoldState = state,
                    drawerContent = {
                        DrawerContent(navigator,scope,state)
                    },
                    topBar = { TopBar(
                        state,
                        scope,
                        title = navigator.lastItem.key,
                        canPop = navigator.canPop,
                        onNavigationBackClick = { navigator.pop() })
                    },
                ) {
                    SlideTransition(navigator)
                }
            }
        }
    }
}