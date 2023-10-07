package ui.home.bottomDeprecated

import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.icons.filled.MoreVert
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.ui.graphics.vector.rememberVectorPainter
import cafe.adriel.voyager.navigator.tab.Tab
import cafe.adriel.voyager.navigator.tab.TabOptions

object AboutTab :  Tab{
    @Composable
    override fun Content() {
    }

    override val options: TabOptions
        @Composable
        get() {
            val title = "About"
            val icon = rememberVectorPainter(Icons.Default.MoreVert)
            return remember{
                TabOptions(
                    index = 2u,
                    title = title,
                    icon = icon
                )
            }
        }
}